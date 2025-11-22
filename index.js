require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const habitRoutes = require('./routes/habitRoutes');
const errorHandler = require('./middlewares/errorHandler');
const PORT = process.env.PORT || 3000;

const connectDB = require('./config/database');
const path = require('path');

const app = express()
const port = 3000

//database connection
connectDB();

//middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/api/habits', habitRoutes);

app.get('/', (req, res) => {
  res.send('a Habit Tracker CRUD API')
})

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
