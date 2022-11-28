const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const app = express();

const PORT = 8002;
// Replace this string with your db connection string
// const db_connection_string = "mongodb://localhost:27017/zainkara"
const db_connection_string = "mongodb://user:password@localhost/zainkara"

// Define mongoose schema
const ContactModel = require("./schema")

app.use(express.urlencoded());

// Set view
app.set("view engine", "pug");

// Get All Contacts
app.get("/", async (req, res) => {
	const contacts = await ContactModel.find({}).exec();
	res.status(200).render("home.pug", { contacts });
});
app.get("/about", (req, res) => {
	res.status(200).render("about.pug");
});
app.get("/services", (req, res) => {
	res.status(200).render("services.pug");
});

app.get("/contact", async (req, res) => {
	res.status(200).render('contact.pug')
});

// Save Contacts
app.post("/contact", async (req, res) => {
	const contact = new ContactModel(req.body);
	try {
		await contact.save()
		res.status(200).render("contact.pug", { message: "The details have been saved successfully" })
	} catch (error) {
		console.log(error);
		res.status(400).render("contact.pug", { message: "Form submission failed" })
	}
});

// Mongoose connection and running app server
mongoose.connect(db_connection_string).then(() => {app.listen(PORT, async () => {
    console.log(`⚡️[server]: Server started at http://localhost:${PORT}`);
  });
}).catch((err) => {
  throw err;
});
