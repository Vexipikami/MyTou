const { protect } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();
const { getMeals, createMeal, deleteMeal, updateMeal } = require('../controllers/mealController');

router.get('/', protect, getMeals);
router.post('/', protect, createMeal);
router.delete('/:id', protect, deleteMeal);
router.put('/:id', protect, updateMeal);

module.exports = router;