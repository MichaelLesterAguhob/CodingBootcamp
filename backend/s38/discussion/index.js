/* let http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World!');

}).listen(4000);

console.log('Server is running at locahost:4000') */


// require directive is to load Node.js modules
// modules is a software component
const http = require("http");
const port = 4000;
let items = ["Laptop", "Desktop", "Tablet"];

const app = http.createServer(function(request, response){

    if(request.url == '/greeting'){
        response.writeHead(200, { 'Content-Type': 'text/plain'});
        response.end('Hello World!');

    } else if (request.url == "/homepage") {
        response.writeHead(200, {'Content-Type': 'text/explain'});
        response.end('This is the homepage');

    } else if (request.url == "/items" && request.method === "GET") {
        response.writeHead(200, {'Content-Type': 'text/explain'});
        response.end(items.toString());

    } else if (request.url == "/items" && request.method === "POST") {
        response.writeHead(200, {'Content-Type': 'text/explain'});
        response.end('This is route will be used to add another item');

    }else {
        response.writeHead(404, {'Content-Type': 'text/explain'});
        response.end('Page not available');
    }
})

app.listen(port);

console.log(`Server is running at localhost: ${port}`);