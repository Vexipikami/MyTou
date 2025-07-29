import React, { useEffect, useState } from 'react';
import api from '../api';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const fetchNotes = async () => {
    const res = await api.get('/notes');
    setNotes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/notes', formData);
    setFormData({ title: '', content: '' });
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Bloc-notes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Contenu"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <strong>{note.title}</strong>: {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
