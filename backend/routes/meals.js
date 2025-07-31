const express = require('express');
const router = express.Router();
const { getMeals, createMeal, deleteMeal } = require('../controllers/mealController');

router.get('/', getMeals);
router.post('/', createMeal);
router.delete('/:id', deleteMeal);

module.exports = router;