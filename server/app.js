
const express = require("express")
const app = express();
const puerto = parseInt(process.env.PORT, 10) || 8888;
const bodyParser = require("body-parser")
const Cors = require("cors")
const mongoose = require("mongoose")
const dbLink = "mongodb://mongo:27017/mongotest"

// Modules
const User = require("./userModel.js")

// Middlewares
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Open port
app.listen(puerto, () => console.log("Listening port " + puerto))

// DataBase connection
mongoose.connect(dbLink, (err) => {
	err ? console.log("Encountered an error in Db Connection") : console.log("Succesfully connected with DB");
})


// ++++++++++++++++ HTTP METHODS +++++++++++++++++++ //

app.get("/", (req, res) => {
	res.send("We are up and going!!")
})

app.get("/users", async (req, res) => {
 const users = await User.find();
 res.json(users);
});

app.post("/log_user", async (req, res) => {
	let body = req.body
	let loginSucceded = false

	const users = await User.find({username: body.username}).then((res) => { 
		if (res.length != 0 && res[0].password == body.password) 
			loginSucceded = true
	})
	loginSucceded ? res.status(200).send("Login Succesfull") : res.status(401).send("Login Failed")
});

app.post("/register_user", async (req, res) => {
	let body = req.body
	let registerSucceded = false

	const user = new User({ username: body.username, password: body.password });
	await user.save()
		.then(() => registerSucceded = true)
		.catch((err) => console.log("error"))

	registerSucceded ? res.status(200).send("Register Succesfull") : res.status(401).send("Register Failed")
});
