import express from 'express';

const app = express();
const port = 3000;

app.get('/bienvenue', (_, res) => {
    res.send(`
        <html>
            <head><title>Bienvenue</title></head>
            <body>
                <h1>Bienvenue sur notre site web !</h1>
            </body>
        </html>
    `);
});

app.get('/info', (_, res) => {
    res.json({
        nom: "John Doe",
        age: 30,
        profession: "Développeur"
    });
});

app.get('/acces-interdit', (_, res) => {
    res.status(403).send('Accès interdit');
});

app.get('/redirection-accueil', (_, res) => {
    res.redirect('/');
});

app.use(function(req, res) {
    res.send(`
        <html>
            <head><title>Page non trouvée</title></head>
            <body>
                <h1>404 - Page non trouvée</h1>
                <ul>
                    <li><a href="/bienvenue">Bienvenue</a></li>
                    <li><a href="/info">Info</a></li>
                    <li><a href="/acces-interdit">Accès interdit</a></li>
                    <li><a href="/redirection-accueil">Redirection vers l'accueil</a></li>
                </ul>
            </body>
        </html>
    `);
});
    

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});