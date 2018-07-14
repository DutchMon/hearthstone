$(document).ready(function() {

  $("#createCharacter").on("click", function() {
    $("body").css("background-color", "#fff");
    $("#createCharacterContainer").fadeIn(200);
    console.log("You clicked the create Character button!");
  });

  $("#genInfo").on("click", function() {
		
		var dandDInfo = $(this).val();
    console.log(dandDInfo);
    
    var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/" + dandDInfo;

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "X-Mashape-Key": "onmuHALv5ymshD87EM84yGdI2eFPp1oQZIXjsnleC83W0Dqash"
      }
    })
    .then(function(response) {
      console.log(response)

      var results = response.data;
      console.log(results.Basic[0].cardId);
			
			for (var i = 0; i < results.length; i++) {
				
      var newRow = $("<tr>").append(
        $("<td>").text(results.Basic[0].cardId),
        $("<td>").text(results.Basic[i].cardId),
        $("<td>").text(results.Basic[i].cardId),
        $("<td>").text(results.Basic[i].cardId)
      );

      $("#cardsInfo > tbody").append(newRow);
    };
    });
  });
});
