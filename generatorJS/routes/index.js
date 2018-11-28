const express = require('express')
const router  = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.connect("mongodb://localhost:27017/generatorProject")

var user = require("../models/User")

/* GET home page */
router.get('/', (req, res, next) => {

  res.render('index');
});

router.post("/loggIn", (req, res) => {
  var userData = {
      username: req.body.username,
      password: req.body.password
  }

  user.findOne({username: userData.username}, (err, data) => {

      if(err){console.log(err);} //Error in server
      else if(!data){
          res.render("index", {error: "Invalid credentials, if you want to create an accout press register"})
      } //If there is no match password I render index
      else{ //If none of the latter things happen I create a cookie for loggedIn and I redirect to the search film
         bcrypt.compare(userData.password, data.password)
         .then((match) => {
        
              if(match){
                  console.log("match!")
                  res.cookie('loggedIn', true, {signed: true})
                  res.cookie('username', userData.username, {signed: true})
                  res.render("generator")
              }
              else{
                  res.render("index",{error: "Invalid credentials, if you want to create an accout press register"})
              }
         })
         .catch((err) => {
              console.log(err)
              console.log("hello!")
              res.render("index", {error: err})
          })
      }
  })  //Finding in database

})

module.exports = router;
