const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')


const User = require("../userModel.js")

router.post("/register_user", async (req, res) => {
	// Parse request Data
	let body = req.body
	let registerSucceded = false

	// Encrypt and create user
	const hash = await bcrypt.hash(body.password, 10);
	const user = new User({ username: body.username, password: hash });

	// Save user and answer request
	await user.save()
		.then(() => registerSucceded = true)
		.catch((err) => console.log("error " + err))

	registerSucceded ? res.status(200).send("Register Succesfull") : res.status(401).send("Register Failed")

});


module.exports = router;