const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const notesRoutes = require('./routes/notes');
const sleepRoutes = require('./routes/sleep');
const workoutRoutes = require('./routes/workouts');
const mealRoutes = require('./routes/meals');

app.use('/api/notes', notesRoutes);
app.use('/api/sleep', sleepRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/meals', mealRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});

