const express = require('express');
const bodyParser = require('body-parser');
fs = require('fs')
const app = express();
var cors = require("cors");
app.options("http://localhost:4200",cors());
app.use(cors())



app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'));

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Notes application."});
});
require('./models/routes/routes.js')(app);
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});