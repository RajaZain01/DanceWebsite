const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
	name: String,
	email: String,
	age: String,
	phone: String,
	address: String,
	desc: String,
});

module.exports = mongoose.model("Contact", ContactSchema);