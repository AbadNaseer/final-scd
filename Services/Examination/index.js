const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/examination', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB - Examination"))
    .catch(err => console.error("Connection failed", err));

// Examination Schema and Model
const examSchema = new mongoose.Schema({
    examId: String,
    subject: String,
    date: Date,
    studentId: String,
    grade: String
});

const Exam = mongoose.model('Exam', examSchema);

// API Endpoints
app.post('/api/exams', async (req, res) => {
    const exam = new Exam(req.body);
    await exam.save();
    res.send(exam);
});

app.get('/api/exams', async (req, res) => {
    const exams = await Exam.find();
    res.send(exams);
});

app.get('/api/exams/:examId', async (req, res) => {
    const exam = await Exam.findOne({ examId: req.params.examId });
    res.send(exam);
});

app.listen(3002, () => console.log("Examination Service running on port 3002"));
