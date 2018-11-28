const express = require('express')
const router  = express.Router()

/*The algorithm to save customized layouts is 80%, then its managment with fs on those parameters + making it downloadable*/
/*To do FOR A MINIMAL PRODUCT PRESENTABLE IN 1 WEEK
  - Help page, 3 sections (plegables)
  - Help page should contain
    - 3 plegable sections -----checked
    - Contanct information ----Not included in basic product
    - Clear and readable sections -----checked
    - Logout Button -----
    - Styles ------ checked
  - Profile page (getting the data from the database with a get request), without profile picture atm, minimalistic product)
  - Profile page should contain
    - Username (changable) ------- checked
    - Date of Brith (changable) ------- checked
    - Show the projects (not changable or deletable), name and when they were created (plegable) -----checked
    - Username (Not changable) -------checked
    - Password (changable) (empty input) -------checked
    - LogOut button ------
    - Styles -------checked
  -Generator page should contain
    - The 3 options to the 3 respective pages- checked 
    - The logout Button- ------not
    - Styles- checked (final styles for SIZE) ------checked
  -Project Generator should contain ----half 
  -Register Page
    - Styles --- Form has to be fixed
    - BackEnd ------checked
    - Dynamic countries
*/ 

var project = require("../models/Project")
var user = require("../models/User")


router.get("/", (req, res) => {
  
  if(req.signedCookies.loggedIn){
    
  res.render("generateProjs")
  }
  else{
    
    res.redirect("/")
  }
})

router.post("/", (req, res) => {
  
  //Default values in case the user submits without filling anything
  var userData = {
    name: req.body.projectName,
    created: getDate(), //todays date
    modules: {
    },
    description: req.body.descriptionProject,
    author: getAuthor(req), //Provisional since I need to retrieve it from the database
    styles: {
    },
    public: false,
    views: false,
    package_json: false,
    images: false,
    javascripts: false,
    stylesheets: false,
    routing: false,
    partials: false,
    models: false,
    bin: false,
    appJS: false,
  }
  // I set the two things that are predeterminated (always) and save them in the database
  // SOMEFUNCTION

  validateCheckboxs(req, userData)
  
  project.create(userData) //DONT USE THE OTHER METHOD, ALL HEIL CREATE
      .then((result) => {
        user.findOneAndUpdate({username: result.author}, {$push: {projects: result._id}}) //We push the ID of the object created 
        .then((updatedUser) => {
          res.cookie("nameProject", userData.name, {signed: true})
          res.render("generateProjs", {output: "The project template was created successfully"})
        
      })
    })
    .catch(err => console.log(err))
})

//When was the project created

function getDate(){
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth()+1 
  var yyyy = today.getFullYear()
  
  if(dd<10) {
      dd = '0'+dd
  } 
  
  if(mm<10) {
      mm = '0'+mm
  } 
  
  today = mm + '/' + dd + '/' + yyyy
  return today
}

function getAuthor(req){
  return req.signedCookies.username
}


function validateCheckboxs (req, userData){
  var reqKeys = Object.keys(req.body) //Contains keys of req.body
  var reqKeysCheckboxs = []; //Contains checkboxs of reqkeys
  var reqCheckboxsValues = []; //Contains the values of the keys (public, views...)

  var valuesInObject = {  //Holds all the keys of userData so I can reference them later (in exact order, mess with this order and you are fucked)
    checkbox0 : "public",
    checkbox1 : "views",
    checkbox2 : "package_json",
    checkbox3 : "images",
    checkbox4 : "javascripts",
    checkbox5 : "stylesheets",
    checkbox6 : "routing",
    checkbox7 : "partials",
    checkbox8 : "models",
    checkbox9 : "bin",
    checkbox10: "appJS",
  }

  //Puts the checkboxes of reqKeys to reqKeysCheckboxes
  for(key in valuesInObject){
    for(let i = 0; i < reqKeys.length; i++){

      var match;
 
      (key == reqKeys[i]) ? match = true: match =false
      if(match){
        reqKeysCheckboxs.push(reqKeys[i])
        reqCheckboxsValues.push(valuesInObject[reqKeysCheckboxs[i]])
      }
    }
  }
  debugger
  reqCheckboxsValues.forEach((element) => {
    userData[element] = true;
    if(!userData[element]){userData[element] = false}
  })
  
  return userData
}

module.exports = router