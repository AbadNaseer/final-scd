const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connectionn
mongoose.connect('mongodb://localhost:27017/attendance', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB - Attendance"))
    .catch(err => console.error("Connection failed", err));

// Attendance Schema and Model
const attendanceSchema = new mongoose.Schema({
    studentId: String,
    date: Date,
    status: String // "Present" or "Absent"
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// API Endpoints
app.post('/api/attendance', async (req, res) => {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.send(attendance);
});

app.get('/api/attendance', async (req, res) => {
    const records = await Attendance.find();
    res.send(records);
});

app.get('/api/attendance/:studentId', async (req, res) => {
    const records = await Attendance.find({ studentId: req.params.studentId });
    res.send(records);
});

app.listen(3001, () => console.log("Attendance Service running on port 3001"));
