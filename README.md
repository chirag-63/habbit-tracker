# 🎯 Habit Tracker API

A full-stack habit tracking application built with Node.js, Express, MongoDB, and vanilla JavaScript. Track your daily habits, build streaks, and maintain consistency in your personal development journey.

## ✨ Features

- **CRUD Operations**: Create, read, update, and delete habits
- **Smart Streak Tracking**: Automatically tracks consecutive days of habit completion with independent streaks per habit
- **Daily Auto-Reset**: Completion status automatically resets each day while preserving streaks
- **Daily Completion**: Mark habits as complete once per day with duplicate prevention
- **Persistence**: MongoDB database for reliable data storage
- **Modern Glassmorphism UI**: Beautiful, responsive web interface with smooth animations
- **RESTful API**: Well-structured API endpoints
- **Comprehensive Error Handling**: Global error handling middleware
- **Environment Config**: Secure configuration with environment variables
- **Real-time Statistics**: Track total habits, daily completions, and best streaks

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variable management

### Frontend
- **HTML5** - Structure
- **CSS3** - Modern glassmorphism design with animations
- **Vanilla JavaScript** - Interactivity and API calls
- **Font Awesome** - Icon library

## 📁 Project Structure

```
luna/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── habitController.js   # Business logic for habit operations
├── middlewares/
│   └── errorHandler.js      # Global error handling middleware
├── models/
│   └── habitModel.js        # Mongoose schema and model
├── public/
│   ├── index.html          # Frontend HTML
│   ├── style.css           # Frontend styles
│   └── app.js              # Frontend JavaScript
├── routes/
│   └── habitRoutes.js      # API route definitions
├── .env                    # Environment variables (not in git)
├── .gitignore             # Git ignore file
├── index.js               # Main server file
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd luna
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/tracker
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   
   Navigate to `http://localhost:3000` in your browser

## 📡 API Endpoints

### Create a Habit
```http
POST /api/habits
Content-Type: application/json

{
  "name": "Drink more water"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "6921671d6afe086ede0ff51b",
    "name": "Drink more water",
    "streak": 0,
    "lastCompleted": null,
    "completed": false,
    "createdAt": "2025-11-22T07:32:45.682Z",
    "updatedAt": "2025-11-22T07:32:45.682Z"
  }
}
```

### Get All Habits
```http
GET /api/habits
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

**Note:** This endpoint automatically checks and updates the daily completion status for all habits. If a habit's `lastCompleted` date is not today, the `completed` flag is automatically reset to `false` while preserving the streak.

### Mark Habit as Complete
```http
PATCH /api/habits/:id/complete
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "6921671d6afe086ede0ff51b",
    "name": "Drink more water",
    "streak": 1,
    "lastCompleted": "2025-11-22",
    "completed": true
  }
}
```

### Uncomplete a Habit (For Testing/Correction)
```http
PATCH /api/habits/:id/uncomplete
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "6921671d6afe086ede0ff51b",
    "name": "Drink more water",
    "streak": 1,
    "lastCompleted": "2025-11-22",
    "completed": false
  }
}
```

### Delete a Habit
```http
DELETE /api/habits/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Habit deleted successfully",
  "data": {}
}
```

## 🗄️ Database Schema

### Habit Model

```javascript
{
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  streak: {
    type: Number,
    default: 0,
    min: 0
  },
  lastCompleted: {
    type: String,
    default: null,
    format: "YYYY-MM-DD"
  },
  completed: {
    type: Boolean,
    default: false
  },
  timestamps: true
}
```

## 🎨 Frontend Features

- **Modern Glassmorphism Design**: Beautiful frosted glass effect with animated gradient backgrounds
- **Add Habits**: Enter new habits via input field with icon support
- **View Habits**: See all habits with their current streaks and completion status
- **Complete Habits**: Mark habits as done for the day with visual feedback
- **Delete Habits**: Remove habits you no longer want to track
- **Real-time Statistics Dashboard**: 
  - Total Active Habits
  - Completed Today count
  - Best Streak across all habits
- **Responsive Design**: Fully responsive layout for desktop and mobile devices
- **Smooth Animations**: Fade-in effects and micro-interactions
- **Visual Feedback**: Completed habits highlighted with green accent and check icons
- **Icon Support**: Font Awesome icons throughout the interface

## 🔒 Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: Input validation for habit names (3-100 characters)
- **Duplicate Completion**: Prevents marking a habit complete twice in one day
- **Not Found Errors**: Handles requests for non-existent habits
- **Database Errors**: Catches and reports database connection issues
- **Server Errors**: Global error handler for unexpected errors

## 📝 Smart Streak Logic

### How It Works:

Each habit maintains its own **independent streak** that updates based on daily completion patterns:

#### Streak Tracking:
- **First Completion**: Streak starts at 1
- **Consecutive Days**: Streak increments by 1 when completed on back-to-back days
- **Missed Days**: Streak resets to 1 on next completion (not to 0)
- **Preserved Streaks**: Streaks are maintained even when `completed` status resets

#### Daily Auto-Reset System:
- **Automatic Check**: Every time habits are fetched, the system checks if `lastCompleted` matches today's date
- **Smart Reset**: If `lastCompleted` is NOT today, `completed` flag automatically resets to `false`
- **Streak Preservation**: The streak value is preserved during daily resets
- **Once Per Day**: Habits can only be marked complete once per day

#### Example Flow:

**Monday**: Complete "Drink water" 
→ `streak: 1, completed: true, lastCompleted: "2025-11-20"`

**Tuesday**: Complete it again 
→ `streak: 2, completed: true, lastCompleted: "2025-11-21"` (consecutive!)

**Wednesday Morning**: Load habits 
→ `streak: 2, completed: false` (auto-reset for new day)

**Wednesday**: Complete it 
→ `streak: 3, completed: true, lastCompleted: "2025-11-22"` (consecutive!)

**Thursday**: Skip (don't complete)

**Friday**: Complete it 
→ `streak: 1, completed: true` (reset because Thursday was missed)

### Key Features:
- ✅ **Independent Tracking**: Each habit has its own streak counter
- ✅ **No Manual Reset**: System automatically resets daily completion status
- ✅ **Streak Preservation**: Missing a day doesn't lose your streak until next completion
- ✅ **Duplicate Prevention**: Cannot mark the same habit complete twice in one day

## 🧪 Testing with Postman

1. Import the API endpoints into Postman
2. Set the base URL: `http://localhost:3000/api/habits`
3. Test each endpoint with sample data
4. Verify responses match expected format

## 📦 Dependencies

```json
{
  "express": "^4.x.x",
  "mongoose": "^8.x.x",
  "dotenv": "^16.x.x",
  "body-parser": "^1.x.x",
  "nodemon": "^3.x.x" (dev)
}
```

## 🚦 Running the Project

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ as a backend development assignment

## 🙏 Acknowledgments

- Express.js documentation
- MongoDB documentation
- Mongoose documentation
- REST API best practices

---

**Happy Habit Tracking! 🎯**
