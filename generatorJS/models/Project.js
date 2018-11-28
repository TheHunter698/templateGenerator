const mongoose = require('mongoose')
const Schema = mongoose.Schema


var projectSchema = new Schema({ 
  name: String,
  created: Date, //todays date
  modules: {

  },
  description: String,
  author: String, //Provisional since I need to retrieve it from the database
  styles: {

  },
  public: Boolean, 
  views: Boolean, 
  package_json: Boolean, 
  images: Boolean, 
  javascripts: Boolean, 
  stylesheets: Boolean, 
  routing: Boolean, 
  partials: Boolean, 
  models: Boolean, 
  bin: Boolean, 
  appJS: Boolean, 
})

var projectInfo = mongoose.model("project", projectSchema)

module.exports = projectInfo