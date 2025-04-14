const fs = require('fs').promises;
const path = require('path');

(async () => {
    try {
        const dir_path = path.join(__dirname, 'nouveau_repertoire');
        
        await fs.mkdir(dir_path);
        console.log('Répertoire créé avec succès.');

        const file_path = path.join(dir_path, 'nouveau_fichier.txt');
        const fileContent = 'Contenu du fichier à écrire.';
        await fs.writeFile(file_path, fileContent);
        console.log('Fichier créé et contenu écrit avec succès.');

        const data = await fs.readFile(file_path, 'utf8');
        console.log('Contenu du fichier lu :', data);

        const files = await fs.readdir(__dirname);
        console.log('Fichiers et répertoires dans le répertoire actuel :', files);

        await fs.unlink(file_path);
        console.log('Fichier supprimé avec succès.');

        await fs.rmdir(dir_path);
        console.log('Répertoire supprimé avec succès.');
    } catch (err) {
        console.error('Erreur :', err);
    }
})();
