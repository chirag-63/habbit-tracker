const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

// POST /api/habits - Create a new habit
router.post('/', habitController.createHabit);

// GET /api/habits - Get all habits
router.get('/', habitController.getAllHabits);

// PATCH /api/habits/:id/complete - Mark habit as complete
router.patch('/:id/complete', habitController.completeHabit);

// PATCH /api/habits/:id/uncomplete - Unmark habit as not complete
router.patch('/:id/uncomplete', habitController.uncompleteHabit);

// DELETE /api/habits/:id - Delete a habit
router.delete('/:id', habitController.deleteHabit);

module.exports = router;