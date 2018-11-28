const express = require('express')
const router  = express.Router()

const user = require('../models/User')
const project = require('../models/Project')

router.post("/", (req, res) => {  
  project.find({author: req.cookies.username,  })
})