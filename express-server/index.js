const express = require('express')
const app = express()
const port = 3010

app.use(express.json()) // < 4.0 use a package, bodyParser

let users = [{ id: 1, name: 'sam'}, {id: 2, name: 'suraj'}]
const customers = [{ id: 1, name: 'customer1', mail: 'customer1@mail.com'}, {id: 2, name: 'customer2', mail: 'customer2@mail.com'}]
// app.matchHttpMethod(url, callFnc)

app.get('/', function(req, res){
    res.send('response from express server')
})

app.get('/about', function(req, res){
    res.send('about us page')
})

app.get('/services', function(req, res){
    res.send('<h2> Listing Services</h2>')
})

app.get('/users', function(req, res){
    res.json(users)
})

app.post('/users', function(req, res){
    const user = req.body
    //console.log(user)
    users.push(user)
    res.json({ user, notice: 'successfully added user'})
})

app.get('/customers', function(req,res){
    res.json(customers)
})

app.get('/customers/:id', function(req, res){
    const id = req.params.id
    console.log(id)
    const customer = customers.find(function(customer){
        console.log(customer.id, customer)
        return customer.id === id
    })

    console.log(customer)
})

app.get('/users/:id', function(req, res){
    const id = req.params.id
    const user = users.find(function(user){
        return user.id == id
    })
    if(user) {
        res.json(user)
    } else {
        res.json({})
    }
})

app.get('/token', function(req, res){
    const token = req.headers['x-auth']
    res.json(token)
})

app.put('/users/:id', function(req, res){
    const id = req.params.id
    const user = users.find(user => user.id = id)
   // let user = users[id - 1]

    Object.assign(user, req.body)
  //  users[id - 1] = user
    res.json({
        notice: `user${id} updated successfully`
    })
})

app.delete('/users/:id', function(req, res){
    const id = req.params.id
    users = users.filter(function(user){
        return user.id != id
    })
    res.json({
        notice: 'successfully removed the record'
    })
})

app.use(function(req, res){
    res.status(404).send('the page you are looking for does not exist')
})

app.listen(port, () => {
    console.log('listening on port', port)
})