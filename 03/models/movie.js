const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre est requis'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    director: {
        type: String,
        trim: true
    },
    releaseDate: {
        type: Date,
        required: [true, 'La date de sortie est requise']
    }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
