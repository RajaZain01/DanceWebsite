const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
main().catch(err => console.log(err));
const port = 8002;

async function main() {
  await mongoose.connect('mongodb://user:password@localhost/zainkara')}
// Define mongoose schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email :String,
  age: String,
  phone: String,
  adress : String,
  desc: String,
});
const Contact = mongoose.model('Contact', ContactSchema);

// const pug = require('pug');
const bodyparser = require('body-parser')
// app.use(express.static('public'))
// app.use('/static', express.static('public'))
app.use(express.urlencoded());

app.set('view engine', 'pug')
app.use('/static', express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
    res.status(200).render('home.pug')
  })
app.get('/about', (req, res) => {
    res.status(200).render('about.pug')
  })
app.get('/services', (req, res) => {
    res.status(200).render('services.pug')
  })
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug')
  })
app.post('/contact', (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("The details have been saved successfully").catch(()=>{
      res.status(400).send("Form submission failed")
    })
  })
  // res.status(200).render('contact.pug')
  })
  app.listen(port , ()=>
  console.log(`App is running onport ${port}`)
  )

