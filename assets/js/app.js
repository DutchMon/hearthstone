$(document).ready(function() {

  //when the user clicks on the createCharacter button the form appears. 
  $("#createCharacter").on("click", function() {
    //this gives the body the a boackground of white
    $("body").css("background-color", "#fff");
    //the container fades in
    $("#createCharacterContainer").fadeIn(200);

    console.log("You clicked the create Character button!");
  });

  //when the user clicks on a button, a certain set of cards appear to the table
  //need to make it so the table is hidden and appears once the 
  //information has loaded after the user clicks the button
  $("#genInfo").on("click", function() {
    
		var dandDInfo = $(this).val();
    console.log(dandDInfo);
    
    var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards";
    
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "X-Mashape-Key": "onmuHALv5ymshD87EM84yGdI2eFPp1oQZIXjsnleC83W0Dqash"
      }
    })
    //determines what to do with the information recieved
    .then(function(response) {
      $cardsInfo = $("#cardsInfo > tbody");
  
      console.log(response);
      console.log(response.Basic.length);
      
      
      //for the length of the information revieved from the basic deck
      //need to recieve the length of the deck of cards,  not from jsut the basic deck
      for (var i = 0; i < response.Basic.length; i++) {

        var img = response.Basic[i].img;
        var imgElement = $("<img class='cardImage' src=" + img + " alt=img>");
        var text = response.Basic[i].text

        //if array has a img print the image to the page, otherwise print no image avaiable
        if (img === undefined) {
          //changes imgElement to write No Image Available to the table
          imgElement = "No Image Available"
        }
        //does the same things as the top one for text
        if (text === undefined) {
          text = "No text available."
        }
        
        var newRow = $("<tr>").append(
          $("<td>").append(imgElement),
          $("<td>").text(response.Basic[i].name),
          $("<td>").text(text),
        );
        $cardsInfo.append(newRow);
    
        $("body").css("background-color", "#fff");
        $("#cardsInfo").fadeIn(200);
        console.log("You clicked the cards Info button!");
      };
    });
  });
});
