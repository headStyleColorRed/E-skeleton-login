
const express = require("express")
const app = express();
const puerto = parseInt(process.env.PORT, 10) || 8888;
const bodyParser = require("body-parser")
const Cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const dbLink = "mongodb://mongo:27017/mongotest"
// const dbLink = "mongodb://localhost:27017/mongotest"

// Modules
const User = require("./userModel.js")

// Middlewares
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

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

app.post("/log_user", async (req, res) => {
	let body = req.body

	// Decrypt and compare user
	let loginResult = await decriptUser(body)

	loginResult ? res.status(200).send("Login Succesfull") : res.status(401).send("Login Failed")
});

app.post("/register_user", async (req, res) => {
	// Parse request Data
	let body = req.body
	let registerSucceded = false

	// Encrypt and create user
	const hash = await bcrypt.hash(body.password, 10);
	const user = new User({ username: body.username, password: hash });

	// Save user and answer request
	await user.save()
		.then(() => registerSucceded = true)
		.catch((err) => console.log("error"))

	registerSucceded ? res.status(200).send("Register Succesfull") : res.status(401).send("Register Failed")

});


async function decriptUser(body) {

	let promise = new Promise((resolve, reject) => {
		User.findOne({ username: body.username })
			.then(user => {
				if (!user) { return }

				bcrypt.compare(body.password, user.password, (err, isMatch) => {
					if (err || !isMatch) { 
						resolve (false)
					 }
					resolve(true)
				})
			})
			.catch(err => reject(err))
	})

	let result = await promise;
	return (result)
}