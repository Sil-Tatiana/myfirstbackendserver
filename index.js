// create a server

// const http = require("http");
// const server = http.createServer((req, res) => {
//   res.statusCode = 404;
//   res.end();
// });

// server.listen(3000, () => {
//   console.log("Server Ready");
// });

//127.0.0.1:3000

// ######### Creating a server with EXPRESS #######
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT;
const fruits = require("./fruits");

app.use(cors());
app.use(express.json());

//Routes

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/fruits", (request, response) => {
  response.send(fruits);
});

const getFruit = (name) => {
  return fruits.find((fruit) => fruit.name.toLowerCase() == name);
};

const getMaxId = () => {
  const ids = fruits.map((fruit) => fruit.id);
  return Math.max(...ids);
};

app.get("/fruits/:name", (request, response) => {
  const name = request.params.name.toLowerCase();
  const fruit = getFruit(name);
  if (fruit == undefined) {
    response.status(404).send();
  } else {
    response.send(fruit);
  }
});

app.post("/fruits", (request, response) => {
  //check if fruit already exists
  const fruit = getFruit(request.body.name);
  if (fruit != undefined) {
    response.status(409).send();
  } else {
    let maxId = getMaxId() + 1;
    request.body.id = maxId;
    fruits.push(request.body);
    response.status(201).send(request.body);
  }
});

app.delete("/fruits/:name", (request, response) => {
  const name = request.params.name.toLowerCase();
  const fruit = getFruit(name);
  const fruitIndex = fruits.indexOf(fruit);
  if (fruitIndex == -1) {
    response.status(404).send();
  } else {
    fruits.splice(fruitIndex, 1);
    response.status(204).send();
  }
});

app.get("/elephant", (request, response) => {
  response.send("There is a big elephant");
});

app.get("/elephant/:name&:age", (request, response) => {
  response.send(request.params);
});

// : => means params, so in this case name is a param that is request to be added.

app.get("/elephant/:name", (request, response) => {
  response.send(request.query); //we are getting the query from the request
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
