const Habit = require('../models/habitModel');

// Create a new habit
exports.createHabit = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Habit name is required' });
    }

    const habit = new Habit({ name });
    await habit.save();

    res.status(201).json({
      success: true,
      data: habit
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all habits
exports.getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    
    // Check and update daily status for each habit
    const updatedHabits = await Promise.all(
      habits.map(habit => habit.checkDailyStatus())
    );

    res.status(200).json({
      success: true,
      count: updatedHabits.length,
      data: updatedHabits
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Mark habit as complete
exports.completeHabit = async (req, res) => {
  try {
    let habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found'
      });
    }

    // Check and update daily status first
    habit = await habit.checkDailyStatus();
    
    // Then mark as complete
    await habit.markComplete();

    res.status(200).json({
      success: true,
      data: habit
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Uncomplete a habit (mark as incomplete for testing or correction)
exports.uncompleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found'
      });
    }

    habit.completed = false;
    await habit.save();

    res.status(200).json({
      success: true,
      data: habit
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Habit deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};