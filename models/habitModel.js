const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Habit name is required'],
    trim: true,
    minlength: [3, 'Habit name must be at least 3 characters long'],
    maxlength: [100, 'Habit name cannot exceed 100 characters']
  },
  streak: {
    type: Number,
    default: 0,
    min: [0, 'Streak cannot be negative']
  },
  lastCompleted: {
    type: String,
    default: null,
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format']
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

habitSchema.methods.markComplete = function() {
  const today = new Date().toISOString().split('T')[0];

  if (this.lastCompleted !== today) {
    this.completed = false;
  }
  
  if (this.lastCompleted === today) {
    throw new Error('Habit already completed today');
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (this.lastCompleted === yesterdayStr) {
    this.streak += 1;
  } else if (this.lastCompleted === null) {
    this.streak = 1;
  } else {
    this.streak = 1;
  }

  this.lastCompleted = today;
  this.completed = true;
  return this.save();
};

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;