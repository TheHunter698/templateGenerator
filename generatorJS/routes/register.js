const express = require('express')
const router  = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


mongoose.connect("mongodb://localhost:27017/projectGenerator")

var user = require("../models/User")
//var data = require("../public/javascripts/data") //Extracting the countries from here 

router.get("/", (req, res) => {
  res.render("register")
})

//Saving register data with post and mongoose 

router.post("/", (req, res) => {

  var userData = {
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    password: req.body.password,
    country: req.body.countries,
    email: req.body.email,
    birthD: req.body.dateB,
    use: req.body.usage,
  }
  console.log(userData)

  bcrypt.hash(userData.password, 5)
  .then((result) => {
    userData.password = result;
    new user(userData)
    .save()
    res.cookie("loggedIn", true, {signed: true})
    res.cookie('username', userData.username, {signed: true})
    res.redirect("/generator")
  })
  .catch(err => console.log(err))
})

module.exports = router;