const { protect } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();
const { getNotes, createNote, deleteNote, updateNote } = require('../controllers/noteController');

router.get('/', protect, getNotes);
router.post('/', protect, createNote);
router.delete('/:id', protect, deleteNote);
router.put('/:id', protect, updateNote);

module.exports = router;
