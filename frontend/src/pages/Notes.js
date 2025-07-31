import React, { useEffect, useState } from 'react';
import api from '../api';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchNotes = async () => {
    const res = await api.get('/notes');
    setNotes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/notes/${editingId}`, formData);
      setEditingId(null);
    } else {
      await api.post('/notes', formData);
    }
    setFormData({ title: '', content: '' });
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await api.delete(`/notes/${id}`);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setFormData({ title: note.title, content: note.content });
    setEditingId(note._id);
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
        <button type="submit">{editingId ? 'Modifier' : 'Ajouter'}</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <strong>{note.title}</strong>: {note.content}
            <button onClick={() => handleEdit(note)}>✏️</button>
            <button onClick={() => handleDelete(note._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
