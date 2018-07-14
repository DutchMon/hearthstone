$(document).ready(function() {

  //when the user clicks on the createCharacter button the form appears. 
  $("#createCharacter").on("click", function() {
    //this gives the body the a boackground of white
    $("body").css("background-color", "#fff");
    //the container fades in
    $("#createCharacterContainer").fadeIn(200);
    //conoles logs the button has been clicked
    console.log("You clicked the create Character button!");
  });

  //when the user clicks on a button, a certain set of cards appear
  $("#genInfo").on("click", function() {
    
    //searchs a specfic kind of cards from premade buttons
		var dandDInfo = $(this).val();
    console.log(dandDInfo);
    
    //the url too the hearthstone api
    var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/" + dandDInfo;

    //it calls to the api when the button is clicked
    $.ajax({
      url: queryURL,
      method: "GET",
      //the api key used to access the information from the api
      headers: {
        "X-Mashape-Key": "onmuHALv5ymshD87EM84yGdI2eFPp1oQZIXjsnleC83W0Dqash"
      }
    })
    //determines what to do with the information recieved
    .then(function(response) {
      //console logs the data recieved
      console.log(response)      
      
      //for the length of the data revieved
			for (var i = 0; i < response.Basic.length; i++) {

        console.log(response.Basic);
				
      var newRow = $("<tr>").append(
        // $("<td>").text(response[i]),
        $("<td>").text(response.Basic[i].name),
        // $("<td>").text(response.Basic[i].cardId),
        // $("<td>").text(response.Basic[i].cardId)
      );

      $("#cardsInfo > tbody").append(newRow);
    };
    });
  });
});
