const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/faculty', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB - Faculty"))
    .catch(err => console.error("Connection failed", err));

// Faculty Schema and Model
const facultySchema = new mongoose.Schema({
    facultyId: String,
    name: String,
    department: String,
    schedule: String,
    tasks: [String]
});

const Faculty = mongoose.model('Faculty', facultySchema);

// API Endpoints
app.post('/api/faculty', async (req, res) => {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.send(faculty);
});

app.get('/api/faculty', async (req, res) => {
    const faculty = await Faculty.find();
    res.send(faculty);
});

app.get('/api/faculty/:facultyId', async (req, res) => {
    const record = await Faculty.findOne({ facultyId: req.params.facultyId });
    res.send(record);
});

app.listen(3003, () => console.log("Faculty Service running on port 3003"));
