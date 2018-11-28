const express = require('express');
const router  = express.Router();


router.get("/", (req, res )=> {
  if(req.cookies.loggedIn == "true")
  res.render("generator")
  else
  res.redirect("/")
})

module.exports = router;