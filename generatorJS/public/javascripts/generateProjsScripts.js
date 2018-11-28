var clicked = false;


$(document).ready(() => {
  if($("#output").text() == "The project template was created successfully"){
    $("form").append("<form action=download method=POST><input type=submit id=download></form>")
   
  }
})

function showAdvanced(){

  var textAppends = [
    "public", 
    "views", 
    "package_json",
    "images",
    "javascripts",
    "stylesheets",
    "routing",
    "partials",
    "models",
    "bin",
    "appJS"]

  if(!clicked){
    for(let i = 0; i < 11; i++){
      $("#checkboxs").append(`<label id=label${i}>${textAppends[i]}</label><input type=checkbox id=check${i} name=checkbox${i}>`)
    }
   
    $("#advancedOptions").toggle()
    $("#checkboxs").append("<input type=button id=hideOptions name=hideOptions value=Hide Options>")

    $("#hideOptions").on("click", () => {
      //Temporary solution since I dont know how to use it yet 
      // $.ajax({
      //   method: "POST",
      //   url: 'mongodb://localhost:27017/projectGenerator',
      //   data: {
      //     clicked: true,
      //   },
      //   success: (result) => {

      //   }
      // })
      $("#checkboxs").toggle()
      $("#advancedOptions").toggle()
      clicked = true;
    })
  }  
  else{
    $("#advancedClicked").prop("checked", true) //FUCK THIS SHEIT BRAH
    $("#advancedOptions").toggle()
    $("#checkboxs").toggle()
  }
}
