import React, { useEffect, useState } from 'react';
import api from '../api';

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    type: '',
    duration: '',
    caloriesBurned: '',
    exercises: '',
  });

  const fetchWorkouts = async () => {
    const res = await api.get('/workouts');
    setWorkouts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/workouts', {
      ...formData,
      exercises: formData.exercises.split(',').map((e) => e.trim()),
    });
    setFormData({ date: '', type: '', duration: '', caloriesBurned: '', exercises: '' });
    fetchWorkouts();
  };

  const handleDelete = async (id) => {
    await api.delete(`/workouts/${id}`);
    fetchWorkouts();
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div>
      <h2>Suivi des entraînements</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
        <input type="text" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} placeholder="Type (ex: muscu)" required />
        <input type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="Durée (min)" required />
        <input type="number" value={formData.caloriesBurned} onChange={(e) => setFormData({ ...formData, caloriesBurned: e.target.value })} placeholder="Calories brûlées" required />
        <input type="text" value={formData.exercises} onChange={(e) => setFormData({ ...formData, exercises: e.target.value })} placeholder="Exercices (séparés par ,)" />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {workouts.map((w) => (
          <li key={w._id}>
            {w.date.slice(0, 10)} – {w.type}, {w.duration} min, {w.caloriesBurned} cal ({w.exercises.join(', ')})
            <button onClick={() => handleDelete(w._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workout;
