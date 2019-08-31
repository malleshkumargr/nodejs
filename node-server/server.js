const http = require('http')
const port = 3010

const server = http.createServer(function(request, response){
    if(request.url == '/') {
        response.end('response from node server')
    } else if(request.url == '/about') {
        response.end('about us page')
    } else if(request.url == '/services') {
        response.setHeader('Content-type', 'text/html')
        response.end('<h2> Listing Services </h2> <ul> <li> App Development </li> <li> Mobile Development</li> </ul>')
    } else if(request.url == '/users') {
        const users = [ { id: 1, name: 'Sam'}, { id: 2, name: 'Rita'}]
        response.setHeader('Content-type', 'application/json')
        response.end(JSON.stringify(users))
    } else if(request.url == '/contact') {
        response.end('contact us page')
    } else {
        response.end('the page you are looking does not exist')
    }
})

server.listen(port, function(){
    console.log('listening on port', port)
})


