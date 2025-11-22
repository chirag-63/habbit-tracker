const API_URL = 'http://localhost:3000/api/habits';

// Load habits on page load
document.addEventListener('DOMContentLoaded', () => {
    loadHabits();
    
    // Add enter key support for input
    document.getElementById('habitInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addHabit();
        }
    });
});

// Load all habits
async function loadHabits() {
    const habitsList = document.getElementById('habitsList');
    habitsList.innerHTML = '<div class="loading">Loading habits...</div>';
    
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.success) {
            displayHabits(result.data);
            updateStats(result.data);
        } else {
            habitsList.innerHTML = '<div class="loading">Error loading habits</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        habitsList.innerHTML = '<div class="loading">Error connecting to server</div>';
    }
}

// Display habits
function displayHabits(habits) {
    const habitsList = document.getElementById('habitsList');
    
    if (habits.length === 0) {
        habitsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h2>No habits yet!</h2>
                <p>Start building better habits by adding your first one above.</p>
            </div>
        `;
        return;
    }
    
    habitsList.innerHTML = habits.map(habit => `
        <div class="habit-card ${habit.completed ? 'completed' : ''}">
            <div class="habit-info">
                <div class="habit-name">
                    ${habit.completed ? '<i class="fas fa-check-circle"></i>' : '<i class="far fa-circle"></i>'}
                    ${habit.name}
                </div>
                <div class="habit-meta">
                    <span class="streak">
                        <i class="fas fa-fire streak-icon"></i>
                        <strong>${habit.streak}</strong> day streak
                    </span>
                    <span class="last-completed">
                        <i class="far fa-calendar"></i>
                        ${habit.lastCompleted ? `Last: ${habit.lastCompleted}` : 'Never completed'}
                    </span>
                </div>
            </div>
            <div class="habit-actions">
                <button 
                    class="btn complete-btn" 
                    onclick="completeHabit('${habit._id}')"
                    ${habit.completed ? 'disabled' : ''}
                >
                    <i class="fas fa-check"></i>
                    ${habit.completed ? 'Completed' : 'Complete'}
                </button>
                <button class="btn delete-btn" onclick="deleteHabit('${habit._id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Update statistics
function updateStats(habits) {
    const totalHabits = habits.length;
    const completedToday = habits.filter(h => h.completed).length;
    const maxStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0;
    
    document.getElementById('totalHabits').textContent = totalHabits;
    document.getElementById('completedToday').textContent = completedToday;
    document.getElementById('maxStreak').textContent = maxStreak;
}

// Add new habit
async function addHabit() {
    const input = document.getElementById('habitInput');
    const name = input.value.trim();
    
    if (!name) {
        alert('Please enter a habit name');
        return;
    }
    
    if (name.length < 3) {
        alert('Habit name must be at least 3 characters long');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        
        const result = await response.json();
        
        if (result.success) {
            input.value = '';
            loadHabits();
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding habit');
    }
}

// Mark habit as complete
async function completeHabit(id) {
    try {
        const response = await fetch(`${API_URL}/${id}/complete`, {
            method: 'PATCH'
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success feedback
            loadHabits();
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error completing habit');
    }
}

// Uncomplete habit (for testing/correction)
async function uncompleteHabit(id) {
    try {
        const response = await fetch(`${API_URL}/${id}/uncomplete`, {
            method: 'PATCH'
        });
        
        const result = await response.json();
        
        if (result.success) {
            loadHabits();
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error uncompleting habit');
    }
}

// Delete habit
async function deleteHabit(id) {
    if (!confirm('Are you sure you want to delete this habit?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            loadHabits();
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting habit');
    }
}
