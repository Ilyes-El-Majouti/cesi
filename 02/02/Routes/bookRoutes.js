const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const livres_path = path.join(__dirname, '../data/livres.json');

router.get('/livres', (req, res) => {
    fs.readFile(livres_path, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Erreur de lecture des livres' });
        const livres = JSON.parse(data);
        res.json(livres);
    });
});

router.get('/livres/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(livres_path, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Erreur de lecture des livres' });
        const livres = JSON.parse(data);
        const livre = livres.find(l => l.id === id);
        if (!livre) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json(livre);
    });
});

router.post('/ajout-livre', express.json(), (req, res) => {
    const { titre, auteur } = req.body;

    if (!titre || !auteur) {
        return res.status(400).json({ error: 'Les champs "titre" et "auteur" sont obligatoires' });
    }

    const nouveau_livre = { titre, auteur };

    fs.readFile(livres_path, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Erreur de lecture du fichier livres' });

        let livres = [];
        try {
            livres = JSON.parse(data);
        } catch (e) {
            return res.status(500).json({ error: 'Fichier livres.json invalide' });
        }

        const max_id = livres.length > 0 ? Math.max(...livres.map(l => l.id)) : 0;
        nouveau_livre.id = max_id + 1;

        livres.push(nouveau_livre);

        fs.writeFile(livres_path, JSON.stringify(livres, null, 2), 'utf8', err => {
            if (err) return res.status(500).json({ error: 'Erreur lors de l\'écriture dans le fichier' });
            res.json({ message: 'Livre ajouté avec succès', livre: nouveau_livre });
        });
    });
});

router.get('/recherche-livre/auteur/:auteur', (req, res) => {
    const auteur = req.params.auteur.toLowerCase();
    fs.readFile(livres_path, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Erreur de lecture des livres' });
        const livres = JSON.parse(data);
        const livres_filtres = livres.filter(l => l.auteur.toLowerCase().includes(auteur));
        res.json(livres_filtres);
    });
});

module.exports = router;