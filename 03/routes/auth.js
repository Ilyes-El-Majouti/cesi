const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const SECRET = 'secret_key_to_change';

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: 'Username already exists' });

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash, role });
  await user.save();
  res.status(201).json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
