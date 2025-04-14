const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const users_file_path = path.join(__dirname, '../data/users.json');

function read_users() {
    const data = fs.readFileSync(users_file_path);
    return JSON.parse(data);
}

router.get('/utilisateurs', (req, res) => {
    const users = read_users();
    res.json(users);
});

router.get('/utilisateurs/:id', (req, res) => {
    const users = read_users();
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ message: 'Utilisateur non trouvé' });
});

router.post('/ajout-utilisateur', express.json(), (req, res) => {
    const users = read_users();
    const new_user = req.body;

    console.log(new_user)

    if (!new_user || !new_user.nom || !new_user.email) {
        return res.status(400).json({ message: 'Invalid user data' });
    }

    users.push({
        id: users.length ? users[users.length - 1].id + 1 : 1,
        nom: new_user.nom,
        email: new_user.email
    });
    fs.writeFileSync(users_file_path, JSON.stringify(users, null, 2));
    res.status(201).json({ message: 'Utilisateur ajouté', user: new_user });
});

router.get('/recherche-utilisateur/nom/:nom', (req, res) => {
    const users = read_users();
    const name = req.params.nom.toLowerCase();
    const results = users.filter(u => u.nom.toLowerCase().includes(name));
    res.json(results);
});

module.exports = router;