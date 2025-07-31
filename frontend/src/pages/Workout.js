import React, { useEffect, useState } from 'react';
import api from '../api';

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    type: '',
    duration: '',
    caloriesBurned: '',
    exercises: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchWorkouts = async () => {
    const res = await api.get('/workouts');
    setWorkouts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      exercises: formData.exercises.split(',').map(e => e.trim())
    };
    if (editingId) {
      await api.put(`/workouts/${editingId}`, payload);
      setEditingId(null);
    } else {
      await api.post('/workouts', payload);
    }
    setFormData({ date: '', type: '', duration: '', caloriesBurned: '', exercises: '' });
    fetchWorkouts();
  };

  const handleEdit = (w) => {
    setFormData({ ...w, exercises: w.exercises.join(', ') });
    setEditingId(w._id);
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
      <h2>Entraînements</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
        <input type="text" placeholder="Type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} required />
        <input type="number" placeholder="Durée (min)" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required />
        <input type="number" placeholder="Calories brûlées" value={formData.caloriesBurned} onChange={(e) => setFormData({ ...formData, caloriesBurned: e.target.value })} required />
        <input type="text" placeholder="Exercices (séparés par virgules)" value={formData.exercises} onChange={(e) => setFormData({ ...formData, exercises: e.target.value })} />
        <button type="submit">{editingId ? 'Modifier' : 'Ajouter'}</button>
      </form>

      <ul>
        {workouts.map((w) => (
          <li key={w._id}>
            {w.date.slice(0, 10)} – {w.type}, {w.duration} min, {w.caloriesBurned} cal ({w.exercises.join(', ')})
            <button onClick={() => handleEdit(w)}>✏️</button>
            <button onClick={() => handleDelete(w._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workout;
