# 🎯 Luna - Habit Tracker

A modern full-stack habit tracking application built with Node.js, Express, MongoDB, and vanilla JavaScript. Track your daily habits, build streaks, get AI-powered suggestions, and maintain consistency in your personal development journey with a beautiful glassmorphism UI.

## ✨ Features

- **CRUD Operations**: Create, read, update, and delete habits
- **AI-Powered Habit Suggestions**: Get personalized habit recommendations based on your goals using Google Gemini AI
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
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - ODM for MongoDB with schema validation
- **Google GenAI** - Gemini 1.5 Flash API for AI-powered habit suggestions
- **dotenv** - Secure environment variable management
- **body-parser** - Request body parsing middleware

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Modern glassmorphism design with gradient animations
- **Vanilla JavaScript** - Pure JS with async/await for API calls
- **Font Awesome 6** - Comprehensive icon library

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
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   To get a Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy and paste it into your `.env` file

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

### Get AI-Powered Habit Suggestions (Bonus Feature)
```http
POST /api/habits/suggest-habits
Content-Type: application/json

{
  "goal": "Get healthier and more fit"
}
```

**Response:**
```json
{
  "success": true,
  "goal": "Get healthier and more fit",
  "suggestions": [
    "Drink 8 glasses of water daily",
    "Exercise for 30 minutes",
    "Eat 5 servings of fruits and vegetables"
  ]
}
```

**Features:**
- Powered by Google Gemini AI
- Generates 3 personalized habit suggestions based on user's goal
- Suggestions are specific, actionable, and suitable for daily practice
- Can add suggestions directly as habits with one click in the UI

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

### Design & UI
- **Modern Glassmorphism Design**: Beautiful frosted glass effect with backdrop blur
- **Animated Gradient Backgrounds**: Floating shapes with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Smooth Transitions**: Fade-in effects and micro-interactions throughout
- **Icon-Rich Interface**: Font Awesome 6 icons for intuitive navigation

### AI-Powered Suggestions 🤖
- **Smart Goal Analysis**: Enter your goal in a multi-line textarea
- **Gemini AI Integration**: Powered by Google's Gemini 1.5 Flash model
- **3 Personalized Habits**: Get specific, actionable daily habit recommendations
- **One-Click Addition**: Add suggested habits directly to your tracker
- **Real-time Feedback**: Loading states, error handling, and success messages

### Habit Management
- **Quick Add**: Simple input field to create new habits
- **Visual Status**: Incomplete habits show simple button, completed habits show green
- **Streak Display**: Fire icon with current streak count for each habit
- **Last Completed**: Calendar icon showing the last completion date
- **Completion Toggle**: Mark habits complete once per day
- **Easy Deletion**: Remove unwanted habits with confirmation

### Statistics Dashboard
- **Active Habits Count**: Total number of habits being tracked
- **Daily Completion**: Number of habits completed today
- **Best Streak**: Highest streak across all habits
- **Icon-Based Cards**: Trophy, fire, and checklist icons for visual appeal

### User Experience
- **Keyboard Support**: Enter key works for both habit and goal inputs
- **Auto-refresh**: UI updates automatically after actions
- **Empty States**: Friendly messages when no habits exist
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

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
  "express": "^4.21.2",
  "mongoose": "^8.9.3",
  "dotenv": "^16.4.7",
  "body-parser": "^1.20.3",
  "@google/genai": "^0.21.0",
  "nodemon": "^3.1.9" (dev)
}
```

### Key Packages:
- **express** - Fast, minimalist web framework
- **mongoose** - Elegant MongoDB object modeling
- **@google/genai** - Official Google Gemini AI SDK
- **dotenv** - Zero-dependency environment variable loader
- **body-parser** - Node.js body parsing middleware
- **nodemon** - Auto-restart server on file changes (development only)

## 🚦 Running the Project

### Development Mode (with auto-reload)
```bash
npm run dev
```
Server runs on `http://localhost:3000` with nodemon watching for changes.

### Production Mode
```bash
npm start
```

### Testing the Application
1. **Open Browser**: Navigate to `http://localhost:3000`
2. **Add Habits**: Use the input field to create new habits
3. **Try AI Suggestions**: Enter a goal in the textarea and get AI recommendations
4. **Mark Complete**: Click "Complete" button to track progress
5. **View Stats**: Check the dashboard for habits, completions, and streaks

### API Testing with Postman
- Base URL: `http://localhost:3000/api/habits`
- Test all CRUD endpoints
- Try the `/suggest-habits` endpoint with a goal

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Project Highlights

### Technical Implementation
- ✅ RESTful API design with proper HTTP methods
- ✅ MongoDB schema validation with Mongoose
- ✅ Async/await for all database operations
- ✅ Global error handling middleware
- ✅ Environment-based configuration
- ✅ AI integration with Google Gemini
- ✅ Modern ES6+ JavaScript features
- ✅ Proper MVC architecture (Models, Controllers, Routes)

### Code Quality
- Clean, modular code structure
- Consistent naming conventions
- Proper error handling and validation
- Commented code where necessary
- No hardcoded values (environment variables)

### User Experience
- Intuitive, modern UI/UX
- Fast, responsive interactions
- Visual feedback for all actions
- Mobile-first responsive design
- Accessible color contrasts

## 🌟 Future Enhancements

Potential features to add:
- User authentication and profiles
- Habit categories and tags
- Habit history and analytics charts
- Reminder notifications
- Social sharing features
- Dark/light theme toggle
- Export habits data (CSV/JSON)
- Habit templates library

## 👨‍💻 Author

**Chirag**  
Built with ❤️ as a backend development assignment

## 🙏 Acknowledgments

- Express.js documentation
- MongoDB & Mongoose documentation
- Google Gemini AI documentation
- Font Awesome icon library
- REST API best practices
- Modern CSS glassmorphism techniques

## 📞 Support

For issues, questions, or contributions:
- GitHub: [chirag-63/habbit-tracker](https://github.com/chirag-63/habbit-tracker)
- Create an issue on GitHub for bug reports
- Pull requests are welcome!

---

**Happy Habit Tracking! 🎯✨**

*Transform your life, one habit at a time.*
