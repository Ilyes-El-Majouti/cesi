const express = require('express');
const app = express();
const path = require('path');
const bookRoutes = require('./Routes/bookRoutes');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', bookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});