require('dotenv').config();
const express = require('express');
const connectDB = require('./config/config');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(express.json());

console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();

app.use('/tasks', tasksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
