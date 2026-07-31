const express = require('express');
const cors = require('cors');
const connectDB = require('./src/Config/db');

connectDB();

const app = express();

const TaskRoutes = require('./src/routes/TaskRoutes');
const UserRoutes = require('./src/routes/UserRoutes');
const AuthRoutes = require('./src/routes/AuthRoutes');

app.use(cors({
    origin: 'https://task-tracker-1-6x51.onrender.com'
}));

app.use(express.json());

app.use('/task', TaskRoutes);
app.use('/user', UserRoutes);
app.use('/auth', AuthRoutes);

app.get('/', (req, res) => {
    res.send('Task Tracker API is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express Server is running on port ${PORT}`);
});