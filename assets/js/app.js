var $setButton = $(".setButton");
var $addCard = $("#addCard");
var $makeDeck = $("#makeDeck");
var $checkBox = $('input:checked').length > 0;

$(document).ready(function() {
  
  var hearthStoneCards = "cards";
  
  var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/" + hearthStoneCards + "/";
  
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "X-Mashape-Key": "XdYJmX80oqmshZPZPci91lDozyiqp1pNJVjjsnJN4oyFk83Jc3"
    }
  })

  //determines what to do with the information recieved
  .then(function(response) {
    $('.loading').addClass("wrapper-hidden");
    $('.show').removeClass("wrapper-hidden");
    $cardsInfo = $("#cardsInfo > tbody");

    console.log(response);

    var setNamesArray = [];

    for (var key in response){
      if(response[key].length !==0){
        setNamesArray.push(key);
      }
    }

    console.log(setNamesArray);
    console.log(setNamesArray[0]);
    console.log(response.Basic.length);

    for (var i = 0; i < setNamesArray.length; i++) {

    $('.dropdown-menu').append("<a class= dropdown-item>"+setNamesArray[i]+"</a>");
    $('.dropdown-menu').addClass("displayCards");
    }

    $('.displayCards').on('click',function(){

        console.log("Hey");
    });

    //for the length of the information revieved from the basic deck
    //need to recieve the length of the deck of cards,  not from jsut the basic deck
    for (var i = 0; i < response.Basic.length; i++) {
      
      var $checkBox = $("<input class='selector' type='checkbox' value=" + i + ">");
      var img = response.Basic[i].img;
      var imgElement = $("<img class='cardImage' src=" + img + " alt=img>");
      var text = response.Basic[i].text;

      //if array has a img print the image to the page, otherwise print no image avaiable
      if (img === undefined) {
        //changes imgElement to write No Image Available to the table
        imgElement = "No Image Available";
      }
      // does the same things as the top one for text
      if (text === undefined) {
        text = "No text available.";
      }
      
      var newRow = $("<tr>").append(
        $("<td>").prepend($checkBox).append(imgElement),
        $("<td>").text(response.Basic[i].name),
        $("<td class='tableText'>").text(text),
      );
      $cardsInfo.append(newRow);
  
      $("body").css("background-color", "#fff");
      $("#cardsInfo").fadeIn(200);
      console.log("You clicked the cards Info button!");
    };

    $makeDeck.on("click", function() {
      $playerDeck = $("#playerDeck > tbody");
  
      var playerDeckArray = [];
  
      if ($("input:checked")) {
        var cardIndex = $("input:checked").val();
        var playerDecktext = response.Basic[cardIndex].text;
        var playerDeckImage = response.Basic[cardIndex].img;
        
        //if array has a img print the image to the page, otherwise print no image avaiable
        if (playerDeckImage === undefined) {
          //changes imgElement to write No Image Available to the table
          playerDeckImage = "No Image Available";
        }
        // does the same things as the top one for text
        if (playerDecktext === undefined) {
          playerDecktext = "No text available.";
        }

        // playerDeckArray.push(imgElement);
        // playerDeckArray.push(cardName);
        // playerDeckArray.push(text);

        // console.log(playerDeckArray)

        var playerDeckRow = $("<tr>").append(
          $("<td>").append(playerDeckImage),
        //   $("<td>").text(cardName),
          $("<td>").text(playerDecktext),
        );

        $playerDeck.append(playerDeckRow);
      }
    })
  });
});