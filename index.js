const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Student = require('./models/student');

mongoose.connect('mongodb://127.0.0.1:27017/studentDetails', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

//------------------Basic imports--------------------

app.get('/student', async(req, res) => {
    const students = await Student.find({})
    res.render('student/show', { students })
})

app.get('/student/new', (req, res) => {
    res.render('student/new')
})

app.get('/student/:id', async(req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id)
    res.render('student/index', { student })
})

//Creating Student data
app.post('/student', async(req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.redirect(`/student/${newStudent._id}`)
})

//Edit the student data
app.get('/student/:id/edit', async(req, res) => {
    const { id } = req.params
    const student = await Student.findById(id)
    res.render('student/edit', { student })
})

app.put('/student/:id', async(req, res) => {
    const { id } = req.params
    const student = await Student.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/student/${student._id}`)
})

//Deleting the Student data
app.delete('/student/:id', async(req, res) => {
    const { id } = req.params
    const deletestudent = await Student.findByIdAndDelete(id)
    res.redirect('/student')
})


app.listen(3000, () => {
    console.log("Server is Started")
})