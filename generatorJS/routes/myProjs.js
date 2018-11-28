const express = require('express');
const router  = express.Router();

var user = require('../models/User')
var project = require('../models/Project')

router.get("/", (req, res) => {

  user.findOne({username: req.signedCookies.username})
  .then((result) => {

    var projects = result.projects
    project.find({_id: { $in: projects}})
    .then((userProjects) => {
      res.render('myProjs',{output: result, output2: userProjects, user: req.signedCookies.username})
    })
  })
  .catch(err => console.log(err))

})

module.exports = router;