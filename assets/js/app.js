var $setButton = $(".setButton");
var $addCard = $("#addCard");
var $makeDeck = $("button");
var $checkBox = $("input:checked").length > 0;
var $chosenCards = $("tr");

$(document).ready(function() {
  var hearthStoneCards = "cards";

  var queryURL =
    "https://omgvamp-hearthstone-v1.p.mashape.com/" + hearthStoneCards + "/";

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "X-Mashape-Key": "XdYJmX80oqmshZPZPci91lDozyiqp1pNJVjjsnJN4oyFk83Jc3"
    }
  })

    //determines what to do with the information recieved
    .then(function(response) {
      $(".loading").addClass("wrapper-hidden");
      $(".show").removeClass("wrapper-hidden");
      $cardsInfo = $("#cardsInfo > tbody");

      console.log(response);

      var setNamesArray = [];

      for (var key in response) {
        if (response[key].length !== 0) {
          setNamesArray.push(key);
        }
      }

      console.log(setNamesArray);

      for (var i = 0; i < setNamesArray.length; i++) {
        $(".dropdown-menu").append("<a class= dropdown-item>" + setNamesArray[i] + "</a>");
        $("a").addClass("displayCards");
      }

      $(".displayCards").on("click", function(replace) {
        $(".cardsDisplay").empty();

        var replace = $(this).text();

        for (var i = 0; i < response[replace].length; i++) {
          var card = response[replace][i];

          // var $checkBox = $(
          //   "<input class='selector' type='checkbox' value=" + i + ">"
          // );
          var imgUrl = card.img;
          var imgElement = $("<img class='cardImage' src=" + imgUrl + " alt=img>");
          var text = card.text;

          $.ajax({
            url: imgUrl,
            type: "HEAD",
            error: function() {
              //do something depressing
              imgElement = $("<p>No Image Available</p>");
              return imgElement;
            },
            success: function() {
              //do something cheerful :)
              var imgElement = $("<img class='cardImage' src=" + imgUrl + " alt=img>");
              return imgElement;
            }
          });

          //does the same things as the top one for text
          if (text === undefined) {
            text = "No text available.";
          }

          var newRow = $("<tr id=" + i + ">").append(
            $("<td>").prepend($checkBox).append(imgElement),
            $("<td>").text(card.name),
            $("<td>").text(text),
            $("<td>").append($("<button class='buttonSelect' id=" + i + ">Select Card</button>")),
          );
          $cardsInfo.append(newRow);

          $("#cardsInfo").fadeIn(200);
        }
  
        $(".buttonSelect").on("click", function() {
          $(this).removeClass("buttonSelect");
          $(this).addClass("buttonRemove");
          $("#playerDeck").fadeIn(200);
          $(this).closest('tr').attr("hidden");
          var playerDeckRow = $(this).closest('tr');
          var cardsInfoRow = playerDeckRow.attr('id')
          console.log(cardsInfoRow);
          $("#playerDeck").append(playerDeckRow);
          
          function resetElement(card) {
            $("#" + card).css("display: block");
          }
          $(".buttonRemove").on("click", function() {
            console.log("i've been clicked");
            $(this).closest('tr').remove();
            resetElement(cardsInfoRow);
          })
        });
      });
    });
  });