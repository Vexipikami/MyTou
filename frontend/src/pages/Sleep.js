import React, { useEffect, useState } from 'react';
import api from '../api';

const Sleep = () => {
  const [sleeps, setSleeps] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    sleepTime: '',
    wakeTime: '',
    comment: '',
  });

  const fetchSleep = async () => {
    const res = await api.get('/sleep');
    setSleeps(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/sleep', formData);
    setFormData({ date: '', sleepTime: '', wakeTime: '', comment: '' });
    fetchSleep();
  };

  const handleDelete = async (id) => {
    await api.delete(`/sleep/${id}`);
   fetchSleep();
  };

  useEffect(() => {
    fetchSleep();
  }, []);

  return (
    <div>
      <h2>Suivi du sommeil</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
        <input type="time" value={formData.sleepTime} onChange={(e) => setFormData({ ...formData, sleepTime: e.target.value })} placeholder="Heure de coucher" required />
        <input type="time" value={formData.wakeTime} onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })} placeholder="Heure de réveil" required />
        <input type="text" value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} placeholder="Commentaire" />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {sleeps.map((s) => (
          <li key={s._id}>
            {s.date.slice(0, 10)} – {s.sleepTime} → {s.wakeTime} ({s.comment})
            <button onClick={() => handleDelete(s._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sleep;
