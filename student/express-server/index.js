const express = require('express')
const fs = require('fs')

const app = express()
const port = 3010
const filePath = "./data/students.json"
const encoding = "utf-8"

app.use(express.json()) // < 4.0 use a package, bodyParser

app.get('/', (req, res) => {
    res.send('Express server is up and running')
})

app.get('/students', function(req, res){
    fs.readFile(filePath, encoding, function(err, students){
        students = JSON.parse(students)
        if(err) {
            res.json({ error: err})
        } else {
            res.json(students)
        }
    })
})

app.get('/students/:studentId', function(req, res){
    const id = req.params.studentId
    console.log('student id: ', id)
    fs.readFile(filePath, encoding, (err, students) => {
        if(err) {
            res.json({error: error})
        } else {
            const student = JSON.parse(students).find(student => student._id === Number(id))
            console.log('student in get by id method', student)
            if(student) {
                res.json(student)
            } else {
                res.json({})
            }
        }
    })
})

app.post('/students', function(req, res){
    let student = req.body
    let students = []
    console.log(student, students)
    fs.readFile(filePath, encoding, (err, data) => {
        if(err) {
            res.json({error: err})
        } else {
            students = JSON.parse(data)
            console.log('students before file read operation',students)
            Object.assign(student, {_id: Number(new Date())})
            console.log('student after id added', student)
            students.push(student)
            console.log('students in after file read operation',students)
            fs.writeFile(filePath, JSON.stringify(students), encoding, (err) => {
                if(err) {
                    res.json({error: err})
                }
                res.json({notice: 'successfully added student', student})
            })     

        }
    })      
})

app.put('/students/:studentId', function(req, res){
    const id = req.params.studentId
    console.log('Student id: ', id)
    fs.readFile(filePath, encoding, (err, students) => {
        if(err) {
            res.json({error: err})
        } else {
            console.log('Before put: ', students)
            const studentInfo = JSON.parse(students)
            const student = studentInfo.find(student => student._id === Number(id))
            Object.assign(student, req.body)
            console.log('studentInfo: ', studentInfo)
            fs.writeFile(filePath, JSON.stringify(studentInfo), encoding, function(err){
                if(err) {
                    res.json({error: err})
                }
                res.json({notice: 'successfully updated student', student})
            })
        }
    })
})

app.delete('/students/:studentId', (req, res) => {
    const id = req.params.studentId
    fs.readFile("./data/students.json", "utf-8", (err, students) => {
        if(err) {
            res.json({error: err})
        } else {
            const studentsInfo = JSON.parse(students)
            const student = studentsInfo.find(student => student._id === Number(id))
            students = studentsInfo.filter(student => student._id !== Number(id))
            fs.writeFile("./data/students.json", JSON.stringify(students), "utf-8", (err) => {
                if(err) {
                    res.json({error: err})
                } else {
                    res.json({notice: 'successfully removed student', student})
                }
            })
        }
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})