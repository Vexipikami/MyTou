const express = require('express');
const router = express.Router();
const { getMeals, createMeal, deleteMeal, updateMeal } = require('../controllers/mealController');

router.get('/', getMeals);
router.post('/', createMeal);
router.delete('/:id', deleteMeal);
router.put('/:id', updateMeal);

module.exports = router;