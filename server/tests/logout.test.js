const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)

const app = require("../app.js")
const loginRequest = require("../requests/loginRequests")
const mongoose = require("mongoose")


describe("Logout Tests", () => {

    before((done) => {
		mongoose.connect("mongodb://localhost:27017/mongologin", { useNewUrlParser: true, useFindAndModify: false }, (err) => { done() })
      });

	it("Logout with wrong email", async () => {
        // Register user
        await chai.request(app).post('/register/register_user').send({
            email: "michaelscott@dundermifflin.com",
            username: "Michael Scott",
            password: "IHateTobyFlenderson4ever",
            passwordConfirmation: "IHateTobyFlenderson4ever"
        })

        // Login user
        await chai.request(app).post('/login/log_user').send({
            email: "michaelscott@dundermifflin.com",
            password: "IHateTobyFlenderson4ever"
        })

        // Loggout user
        let res = await chai.request(app).post('/logout/logout_user').send({
            email: "michaelcott@dundermifflin.com",
            password: "IHateTobyFlenderson4ever"
        })


    	expect(res.status).to.equal(200)
    	expect(res.body.code).to.equal("400")
    	expect(res.body.status).to.equal("Logout Error")
	})
    
	it("Logout with wrong password", async () => {
        // Loggout user
        let res = await chai.request(app).post('/logout/logout_user').send({
            email: "michaelscott@dundermifflin.com",
            password: "IHateTobyFlenderson4eve"
        })

    	expect(res.status).to.equal(200)
    	expect(res.body.code).to.equal("400")
    	expect(res.body.status).to.equal("Logout Error")
	})
    
	it("Logout request", async () => {
        // Loggout user
        let res = await chai.request(app).post('/logout/logout_user').send({
            email: "michaelscott@dundermifflin.com",
            password: "IHateTobyFlenderson4ever"
        })

    	expect(res.status).to.equal(200)
    	expect(res.body.code).to.equal("200")
    	expect(res.body.status).to.equal("Logout Succesfull")
	})



    after((done) => {
        chai.request(app).get("/deleteUsers").then(() => {
            mongoose.disconnect(done);
        })
    });
})