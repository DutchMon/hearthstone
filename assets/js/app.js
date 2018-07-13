//This starts and stops the quiz
$(document).ready(function() {
  //this makes the quiz start and the isntructions disappear
  $("#createCharacter").on("click", function() {
    $("body").css("background-color", "#fff");
    $("#createCharacterContainer").fadeIn(200);
    console.log("You clicked the create Character button!");
  });
});
