var $setButton = $(".setButton");
var $addCard = $("#addCard");
var $makeDeck = $("button");
var $chosenCards = $("tr");

$(document).ready(function() {
  var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/";

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "X-Mashape-Key": "XdYJmX80oqmshZPZPci91lDozyiqp1pNJVjjsnJN4oyFk83Jc3"
    }
  })
  //determines what to do with the information recieved
  .then(function(cardSets) {
    $(".loading").addClass("wrapper-hidden");
    $(".show").removeClass("wrapper-hidden");
    $cardsInfo = $("#cardsInfo > tbody");

    console.log(cardSets);

    var setDeckNamesArray = [];

    for (var key in cardSets) {
      if (cardSets[key].length !== 0) {
        setDeckNamesArray.push(key);
      }
    }

    console.log(setDeckNamesArray);

    for (var i = 0; i < setDeckNamesArray.length; i++) {

        if (i<setDeckNamesArray.length/3){
            $('.col1').append("<a class= dropdown-item>"+setDeckNamesArray[i]+"</a>")
            $('a').addClass("displayCards");
        }
        else if (i>setDeckNamesArray.length/3 && i<(setDeckNamesArray.length/3)*2){
            $('.col2').append("<a class= dropdown-item>"+setDeckNamesArray[i]+"</a>")
            $('a').addClass("displayCards");
        }
        else {
            $('.col3').append("<a class= dropdown-item>"+setDeckNamesArray[i]+"</a>")
            $('a').addClass("displayCards");
        }
    }

    $(".displayCards").on("click", function(replace) {
      $(".cardsDisplay").empty();

      var replace = $(this).text();

      for (var i = 0; i < cardSets[replace].length; i++) {
        var card = cardSets[replace][i];
        var imgUrl = card.img;
        var cardType = card.type;
        var playerClass = card.playerClass;
        var cardSet = card.cardSet;
        var cardFaction = card.faction;
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
          $("<td>").append(imgElement),
          $("<td>").text(card.name),
          $("<td>").text(text),
          $("<td>").text(cardFaction),
          $("<td>").text(cardType),
          $("<td>").text(playerClass),
          $("<td>").text(cardSet),
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
        var ClassoftheRow = row.attr("class");

        row.detach();

        // if it is in the parent table
        if (ClassoftheRow==IDofthetable) {

          //move to playerDeck table
          $("#playerDeck").append(row);
        } else {
          
          //move to parent table
          $("#"+ClassoftheRow).append(row);
        }
      });      
    });
  })

  $(".classes").on("click", function() {
    
    var classOfCards = $(this).text();
    console.log(classOfCards)

    var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/" + classOfCards;

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "X-Mashape-Key": "rruq02mvUemshfKdA9mFcE1IYPZhp1qP0yBjsnNFN9a6djXXv6"
      }
    })
    //determines what to do with the information recieved
    .then(function(cardClasses) {
      console.log(cardClasses);

      $(".cardsDisplay").empty();

      console.log(cardClasses.length);

      for (var i = 0; i < cardClasses.length; i++) {
        var card = cardClasses[i];
        var imgUrl = card.img;
        var cardType = card.type;
        var playerClass = card.playerClass;
        var cardSet = card.cardSet;
        var cardFaction = card.faction;
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
          $("<td>").append(imgElement),
          $("<td>").text(card.name),
          $("<td>").text(text),
          $("<td>").text(cardFaction),
          $("<td>").text(cardType),
          $("<td>").text(playerClass),
          $("<td>").text(cardSet),
          $("<td>").append($("<a href='#' class='buttonSelect' id=" + i + ">Add</button>")),
        );
        $cardsInfo.append(newRow);

        $("#cardsInfo").fadeIn(200);
      };

      $(".buttonSelect").click(function () {
        $("#playerDeck").fadeIn(200);

        var row = $(this).closest("tr");
        var table = $(this).closest("table");
        var IDofthetable = table.attr('id');
        var ClassoftheRow = row.attr("class");

        row.detach();

        // if it is in the parent table
        if (ClassoftheRow==IDofthetable) {

          //move to playerDeck table
          $("#playerDeck").append(row);
        } else {
          
          //move to parent table
          $("#"+ClassoftheRow).append(row);
        }
      });
    });
  });
});

// ---------------------------YOUTUBE STUFFFFFFFFFFFF---------------------------

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'GPAsYTzi-iI',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
