import React, { useEffect, useState } from 'react';
import api from '../api';

const Meal = () => {
  const [meals, setMeals] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    ingredients: '',
    prepTime: '',
    calories: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchMeals = async () => {
    const res = await api.get('/meals');
    setMeals(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(i => i.trim())
    };
    if (editingId) {
      await api.put(`/meals/${editingId}`, payload);
      setEditingId(null);
    } else {
      await api.post('/meals', payload);
    }
    setFormData({ date: '', name: '', ingredients: '', prepTime: '', calories: '' });
    fetchMeals();
  };

  const handleEdit = (m) => {
    setFormData({ ...m, ingredients: m.ingredients.join(', ') });
    setEditingId(m._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/meals/${id}`);
    fetchMeals();
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div>
      <h2>Repas</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
        <input type="text" placeholder="Nom du plat" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="text" placeholder="Ingrédients (séparés par virgules)" value={formData.ingredients} onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })} />
        <input type="number" placeholder="Temps de préparation (min)" value={formData.prepTime} onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })} />
        <input type="number" placeholder="Calories" value={formData.calories} onChange={(e) => setFormData({ ...formData, calories: e.target.value })} />
        <button type="submit">{editingId ? 'Modifier' : 'Ajouter'}</button>
      </form>

      <ul>
        {meals.map((m) => (
          <li key={m._id}>
            {m.date.slice(0, 10)} – {m.name} ({m.ingredients.join(', ')}) – {m.calories} cal
            <button onClick={() => handleEdit(m)}>✏️</button>
            <button onClick={() => handleDelete(m._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meal;
