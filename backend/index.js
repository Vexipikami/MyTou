const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.send('Backend MyTou opérationnel 🎉');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`);
});