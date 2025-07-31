const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.status(201).json(note);
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la note' });
  }
};