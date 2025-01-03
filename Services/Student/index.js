const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/student', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB - Student"))
    .catch(err => console.error("Connection failed", err));

// Student Schema and Model
const studentSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    grades: [{ subject: String, grade: String }],
    progress: String
});

const Student = mongoose.model('Student', studentSchema);

// API Endpoints
app.post('/api/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
});

app.get('/api/students', async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

app.get('/api/students/:studentId', async (req, res) => {
    const student = await Student.findOne({ studentId: req.params.studentId });
    res.send(student);
});

app.listen(3004, () => console.log("Student Service running on port 3004"));
