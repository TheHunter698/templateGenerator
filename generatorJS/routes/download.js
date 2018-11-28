const express = require('express')
const router  = express.Router()
const admZip = require('adm-zip')

var user = require('../models/User')
var project = require('../models/Project')

router.get("/", (req, res) => {
  res.render("generateProjs", {output: "The project template was created successfully"})
})

router.post("/", (req, res) => {
  //Here I create all the directories

  var userID = user.findOne({username: req.signedCookies.username})
  .then((result) => {
    return result._id
  })
  .catch(err => console.log(err))

  //Path to Storage
  var zip = new admZip(`./public/templates/${userID.toString()}.zip`); //New zip
  var pathToZip = `../public/templates/${userID.toString()}.zip`

  var template = []
  project.findOne({name: req.signedCookies.nameProject, author: req.signedCookies.username})
  .then((result) => {
    for(folder in result){
      if(result.folder == true){
        template.push(key)
      }
    }
  })
  .catch(err => console.log(err))

  template.forEach((element) => {
    zip.addLocalFolder(element);
  })

  zip.writeZip(pathToZip);
  
  res.download(`./public/templates/${userID}.zip`)

})

module.exports = router