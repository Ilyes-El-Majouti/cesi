const express = require('express');
const Movie = require('./models/movie');

const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const { auth, authorize } = require('./middlewares/auth');
app.use(express.json());
app.use('/auth', authRoutes);

mongoose.connect('mongodb+srv://ilyeselmajouti:qezr1dOPhgyVM4qK@cluster0.nw8rh9y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('✅ Connecté à MongoDB');
    await seedMovies();
  })
    .catch((err) => console.error('❌ Erreur de connexion MongoDB:', err));

async function seedMovies() {
    const count = await Movie.countDocuments();
    if (count === 0) {
        const defaultMovies = [
            {
                title: 'Inception',
                description: 'Un voleur spécialisé dans l\'extraction de secrets enfouis dans le subconscient.',
                director: 'Christopher Nolan',
                releaseDate: '2010-07-16'
            },
            {
                title: 'Le Parrain',
                description: 'L\'histoire de la famille mafieuse Corleone.',
                director: 'Francis Ford Coppola',
                releaseDate: '1972-03-24'
            },
            {
                title: 'Interstellar',
                description: 'Une équipe d\'explorateurs voyage à travers un trou de ver dans l’espace.',
                director: 'Christopher Nolan',
                releaseDate: '2014-11-07'
            }
        ];

        await Movie.insertMany(defaultMovies);
        console.log('🎬 3 films par défaut ajoutés à la base de données');
    } else {
        console.log('📁 Des films existent déjà, pas d\'insertion par défaut.');
    }
}

app.post('/movies', auth, authorize('Administrateur'), async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/movies', auth, authorize('Visiteur', 'Administrateur'), async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/movies/search/:title', async (req, res) => {
    try {
        const regex = new RegExp(req.params.title, 'i');
        const movies = await Movie.find({ title: regex });
        if (movies.length === 0) return res.status(404).json({ message: 'Aucun film trouvé' });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!movie) return res.status(404).json({ message: 'Film non trouvé' });
        res.json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/movies/:id', async (req, res) => {
    try {
        const result = await Movie.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Film non trouvé' });
        res.json({ message: 'Film supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🎬 Serveur démarré sur http://localhost:${PORT}`);
});