import React, { useEffect, useState } from 'react';
import api from '../api';

const Meal = () => {
  const [meals, setMeals] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    ingredients: '',
    prepTime: '',
    calories: '',
  });

  const fetchMeals = async () => {
    const res = await api.get('/meals');
    setMeals(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/meals', {
      ...formData,
      ingredients: formData.ingredients.split(',').map((i) => i.trim()),
    });
    setFormData({ date: '', name: '', ingredients: '', prepTime: '', calories: '' });
    fetchMeals();
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div>
      <h2>Planification des repas</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Nom du plat" required />
        <input type="text" value={formData.ingredients} onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })} placeholder="Ingrédients (séparés par ,)" />
        <input type="number" value={formData.prepTime} onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })} placeholder="Temps (min)" />
        <input type="number" value={formData.calories} onChange={(e) => setFormData({ ...formData, calories: e.target.value })} placeholder="Calories" />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {meals.map((m) => (
          <li key={m._id}>
            {m.date.slice(0, 10)} – {m.name} ({m.ingredients.join(', ')}) – {m.calories} cal
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meal;
