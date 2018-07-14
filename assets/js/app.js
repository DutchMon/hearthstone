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

  //when the user clicks on a button, a certain set of cards appear to the table
  //need to make it so the table is hidden and appears once the 
  //information has loaded after the user clicks the button
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
      
      //for the length of the information revieved from the basic deck
      //need to recieve the length of the deck of cards,  not from jsut the basic deck
			for (var i = 0; i < response.Basic.length; i++) {

        //console logs the basic deck to the console log, bad idea, uses just one.
        console.log(response.Basic[0]);
        
      //adds a row to the table
      var newRow = $("<tr>").append(
        // $("<td>").text(response[i]),
        //prints the name of the cards
        $("<td>").text(response.Basic[i].name),
        // $("<td>").text(response.Basic[i].cardId),
        // $("<td>").text(response.Basic[i].cardId)
      );
      //appends the row to the body of the table
      $("#cardsInfo > tbody").append(newRow);
    };
    });
  });
});
