const express = require('express');
const app = express();
const PORT = 3000;

const routes = require('./Routes');

app.use('/', routes.generalRoutes);
app.use('/', routes.userRoutes);

app.listen(PORT, () => {
  console.log(`Serveur en cours sur http://localhost:${PORT}`);
});