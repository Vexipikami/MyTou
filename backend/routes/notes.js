const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET : Toutes les notes
router.get('/', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// POST : Nouvelle note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  await note.save();
  res.status(201).json(note);
});

module.exports = router;
