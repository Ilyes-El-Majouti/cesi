const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Bienvenue sur le site !');
});

module.exports = router;