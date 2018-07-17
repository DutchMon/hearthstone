var $setButton = $(".setButton");
var $addCard = $("#addCard");
var $makeDeck = $("#makeDeck");
var $checkBox = $('input:checked').length > 0;
var $chosenCards = $('<tr>');

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

    for (var i = 0; i < setNamesArray.length; i++) {

    $('.dropdown-menu').append("<a class= dropdown-item>"+setNamesArray[i]+"</a>")
    $('a').addClass("displayCards");
    }

    $('.displayCards').on('click',function(replace){

      $('.cardsDisplay').empty();

      var replace = $(this).text();

      for (var i = 0; i < response[replace].length; i++) {

        var card = response[replace][i];
      
        var $checkBox = $("<input class='selector' type='checkbox' value=" + i + ">");
        var img = card.img;
        var imgElement = $("<img class='cardImage' src=" + img + " alt=img>");
        var text = card.text

        //if array has a img print the image to the page, otherwise print no image avaiable
        if (img === undefined) {
          //changes imgElement to write No Image Available to the table
          imgElement = "No Image Available"
        }
        //does the same things as the top one for text
        if (text === undefined) {
          text = "No text available."
        }
        
        var newRow = $("<tr value="+i+">").append(
          $("<td>").prepend($checkBox).append(imgElement),
          $("<td>").text(card.name),
          $("<td>").text(text),
        );
        $cardsInfo.append(newRow);
    
        $("body").css("background-color", "#fff");
        $("#cardsInfo").fadeIn(200);
      };

      $chosenCards.on("click", function(){
        var cardValue = $(this).val();

        console.log(cardValue)

        return cardValue;
      });


      $makeDeck.on("click", function() {
        // $playerDeck = $("#playerDeck > tbody");
    
        

        
        var playerDeckArray = [];
    
        // if ($("input:checked")) {
        //   var cardIndex = $("input:checked").val();
        //   var playerDecktext = response[replace][cardIndex].text;
        //   var playerDeckImage = response[replace][cardIndex].img;
          
          var card = response[replace][cardValue];
      
          var $checkBox = $("<input class='selector' type='checkbox' value=" + cardValue + ">");
          var img = card.img;
          var imgElement = $("<img class='cardImage' src=" + img + " alt=img>");
          var text = card.text
  
          //if array has a img print the image to the page, otherwise print no image avaiable
          if (img === undefined) {
            //changes imgElement to write No Image Available to the table
            imgElement = "No Image Available"
          }
          //does the same things as the top one for text
          if (text === undefined) {
            text = "No text available."
          }
          
          var newRow = $("<tr value="+i+">").append(
            $("<td>").prepend($checkBox).append(imgElement),
            $("<td>").text(card.name),
            $("<td>").text(text),
          );
          $cardsInfo.append(newRow);
      
          $("body").css("background-color", "#fff");
          $("#cardsInfo").fadeIn(200);




          //if array has a img print the image to the page, otherwise print no image avaiable
        //   if (playerDeckImage === undefined) {
        //     //changes imgElement to write No Image Available to the table
        //     playerDeckImage = "No Image Available";
        //   }

        //   console.log(playerDeckImage)
        //   // does the same things as the top one for text
        //   if (playerDecktext === undefined) {
        //     playerDecktext = "No text available.";
        //   }
          
        //   var playerDeckImageShown = $("<img class='cardImage' src=" + playerDeckImage + " alt=img>");

  
        //   // playerDeckArray.push(imgElement);
        //   // playerDeckArray.push(cardName);
        //   // playerDeckArray.push(text);
  
        //   // console.log(playerDeckArray)
  
        //   var playerDeckRow = $("<tr>").append(
        //     $("<td>").append(playerDeckImageShown),
        //   //   $("<td>").text(cardName),
        //     $("<td>").text(playerDecktext),
        //   );
  
        //   $playerDeck.append(playerDeckRow);
        // }
      })
    });
  })
});
