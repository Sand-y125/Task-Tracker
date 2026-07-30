const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

connectDB();

const app = express();

const TaskRoutes = require('./src/Routes/TaskRoutes');
const UserRoutes = require('./src/Routes/UserRoutes');
const AuthRoutes = require('./src/Routes/AuthRoutes'); 
const VerifyToken = require('./src/middleware/VerifyToken');

app.use(cors());
app.use(express.json());

app.use('/task', TaskRoutes);
app.use('/user', UserRoutes);
app.use('/auth', AuthRoutes); 


app.listen(5000, () => {
    console.log('Express Server is running on port 5000');
});