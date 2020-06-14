const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')


const User = require("../userModel.js")

router.post("/log_user", async (req, res) => {
	let body = req.body

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