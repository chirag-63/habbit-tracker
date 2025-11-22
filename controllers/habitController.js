const Habit = require('../models/habitModel');
const { GoogleGenAI } = require('@google/genai');

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

// AI-powered habit suggestions using Gemini
exports.suggestHabits = async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal || goal.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Goal is required'
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Gemini API key not configured'
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `Based on the following goal: "${goal}", suggest exactly 3 specific, actionable daily habits that would help achieve this goal. 

Format your response as a simple numbered list with just the habit names, one per line. Each habit should be:
- Specific and actionable
- Suitable for daily practice
- Directly related to the goal
- Concise (under 50 characters)

Example format:
1. Drink 8 glasses of water
2. Walk 10,000 steps daily
3. Sleep before 11 PM

Now suggest 3 habits for the goal: "${goal}"`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    const text = response.text
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const habits = [];

    for (const line of lines) {
      const match = line.match(/^[\d\-\*\.]+\s*(.+)$/);
      if (match && habits.length < 3) {
        habits.push(match[1].trim());
      }
    }

    if (habits.length < 3) {
      return res.status(500).json({
        success: false,
        error: 'Could not generate enough habit suggestions'
      });
    }

    res.status(200).json({
      success: true,
      goal: goal,
      suggestions: habits.slice(0, 3)
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate habit suggestions: ' + error.message
    });
  }
};