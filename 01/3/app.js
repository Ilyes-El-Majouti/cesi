const fs = require('fs').promises;
const path = require('path');

(async () => {
    try {
        const documents_dir = path.join(__dirname, 'documents');
        const rapport_file_ath = path.join(documents_dir, 'rapport.txt');

        try {
            await fs.access(documents_dir);
        } catch {
            await fs.mkdir(documents_dir);
        }

        try {
            await fs.access(rapport_file_ath);
        } catch {
            await fs.writeFile(rapport_file_ath, '');
        }

        console.log('Chemin complet avec path.join:', rapport_file_ath);

        const absolute_path = path.resolve(rapport_file_ath);
        console.log('Chemin absolu avec path.resolve:', absolute_path);

        const extension = path.extname(rapport_file_ath);
        console.log('Extension du fichier avec path.extname:', extension);

        const directory = path.dirname(rapport_file_ath);
        console.log('Répertoire avec path.dirname:', directory);

        const baseName = path.basename(rapport_file_ath, extension);
        console.log('Nom du fichier sans extension avec path.basename:', baseName);

        const parsedPath = path.parse(rapport_file_ath);
        console.log('Détails du chemin avec path.parse:', parsedPath);

        const normalizedPath = path.normalize('documents//subdir/../rapport.txt');
        console.log('Chemin normalisé avec path.normalize:', normalizedPath);
    } catch (error) {
        console.error('Erreur:', error);
    }
})();