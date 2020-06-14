const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')

// Modules
const User = require("../mongoDB/userModel.js")
const ValidationManager = require("../tools/validation.js")


router.post("/log_user", async (req, res) => {
	let body = req.body

	// Verify request data
	let validation = ValidationManager.validateLoginData(body)
	if (validation.isError) {
		res.status(401).send(validation.errorMessage)
		return
	}

	// Decrypt and compare user
	let loginResult = await decriptUser(body)

	loginResult ? res.status(200).send("Login Succesfull") : res.status(401).send("Login Failed")
});


async function decriptUser(body) {

	let promise = new Promise((resolve, reject) => {
		User.findOne({ username: body.username })
			.then(user => {
				if (!user) { 
					resolve(false) 
					return
				}
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



module.exports = router;