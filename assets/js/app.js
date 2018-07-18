var $setButton = $(".setButton");
var $addCard = $("#addCard");
var $makeDeck = $("button");
var $checkBox = $("input:checked").length > 0;
var $chosenCards = $("tr");

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

        var newRow = $("<tr id=" + i + " class='cardsInfo'>").append(
          $("<td>").prepend($checkBox).append(imgElement),
          $("<td>").text(card.name),
          $("<td>").text(text),
          $("<td>").append($("<a href='#' class='buttonSelect' id=" + i + ">Add</button>")),
        );
        $cardsInfo.append(newRow);

        $("#cardsInfo").fadeIn(200);
        
      }
      $(".buttonSelect").click(function () {
        $("#playerDeck").fadeIn(200);
        var row = $(this).closest("tr");
        var table = $(this).closest("table");

        var IDofthetable = table.attr('id');
        console.log(IDofthetable);
        var ClassoftheRow = row.attr("class");

        row.detach();

        if (ClassoftheRow==IDofthetable) {  // if it is in the parent table
          $("#playerDeck").append(row);  //move to table 4
        }
        else {
          $("#"+ClassoftheRow).append(row); //move to parent table
        }
      });      
    });
  });
});