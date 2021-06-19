const express = require("express")
const app = express();
const bodyParser = require('body-parser');
const puerto = parseInt(process.env.PORT, 10) || 8888;
const Cors = require("cors")
const mongoose = require("mongoose")
const environment = process.env.NODE_ENV
const jwt = require('jsonwebtoken');
var dbLink = new String()
require('dotenv').config()


// Modules
const User = require("./mongoDB/userModel.js")

// Set environment
console.log(`Current environment -> ${environment}`);
if (environment == "production")
	dbLink = "mongodb://login_DB:27017/mongologin"
else 
	dbLink = "mongodb://localhost:27017/mongologin"


// Middlewares
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


// Routes
app.use("/login", require("./requests/loginRequests"))
app.use("/register", require("./requests/registerRequests"))
app.use("/logout", validateToken, require("./requests/logoutRequest"))
app.use("/status", validateToken, require("./requests/statusRequests"))


// Open port
app.listen(puerto, () => console.log("Listening port " + puerto))


// JWT Authenticate
function validateToken(req, res, next) {
	const token = req.headers["authorization"]
	if (!token)
		return res.status(200).send({ code: "400", status: "Access denied, no authorization token received" });

	 jwt.verify(token, process.env.SECRET, (err, user) => {
		 if (err)
			return res.status(200).send({ code: "400", status: "Access denied, token expired or incorrect" });
		 next()
	 })
}

// DataBase connection
if (environment != "testing") {
	let timeOut = setInterval(() => {
		mongoose.connect(dbLink, { useNewUrlParser: true, useFindAndModify: false }, (err) => {
			if (err) {
				console.log("Encountered an error in Db Connection")
			} else {
				console.log("Succesfully connected with DB");
				clearInterval(timeOut)
			}
		})
	}, 5000);
}

// ++++++++++++++++ HTTP METHODS +++++++++++++++++++ //

app.get("/", (req, res) => {
	res.send("E-skeleton-login is up and running! :D")
})

app.get("/users", async (req, res) => {					//	 B O R R A R
	const users = await User.find();					//	 B O R R A R
	res.json(users);									//	 B O R R A R
});

app.get("/deleteUsers", async (req, res) => {			//	 B O R R A R
	const users = await User.deleteMany();				//	 B O R R A R
	res.json("Users deleted");							//	 B O R R A R
});



module.exports = app