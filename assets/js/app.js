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
          $("<td>").prepend($checkBox).append(imgElement),
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