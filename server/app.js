
const express = require("express")
const app = express();
const puerto = parseInt(process.env.PORT, 10) || 8888;
const bodyParser = require("body-parser")
const Cors = require("cors")
const mongoose = require("mongoose")
const environment = process.env.NODE_ENV
var dbLink = new String()

// Modules
const User = require("./userModel.js")

// Set environment
if (environment == "development")
	dbLink = "mongodb://localhost:27017/mongotest"
else 
	dbLink = "mongodb://mongo:27017/mongotest"

// Middlewares
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.use("/login", require("./requests/loginRequests"))
app.use("/register", require("./requests/registerRequests"))

// Open port
app.listen(puerto, () => console.log("Listening port " + puerto))

// DataBase connection
mongoose.connect(dbLink, { useNewUrlParser: true }, (err) => {
	err ? console.log("Encountered an error in Db Connection") : console.log("Succesfully connected with DB");
})


// ++++++++++++++++ HTTP METHODS +++++++++++++++++++ //

app.get("/", (req, res) => {
	res.send("We are up and going!!")
})


app.get("/users", async (req, res) => {					//	 B O R R A R
	const users = await User.find();					//	 B O R R A R
	res.json(users);									//	 B O R R A R
});



