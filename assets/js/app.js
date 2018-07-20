// firebase

 // Initialize Firebase
 var config = {
   apiKey: "AIzaSyDENvgeDfgrChnBszfC_nx19WTTxHGDDiI",
   authDomain: "hearthstonearchive.firebaseapp.com",
   databaseURL: "https://hearthstonearchive.firebaseio.com",
   projectId: "hearthstonearchive",
   storageBucket: "hearthstonearchive.appspot.com",
   messagingSenderId: "537574939649"
 };
 firebase.initializeApp(config);


var database = firebase.database();


var $setButton = $(".setButton");
var $addCard = $("#addCard");
var $makeDeck = $("button");
var $chosenCards = $("tr");

// $(".displayCards").onclick = function () {
//   queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/";
//   console.log(queryURL)
//   return queryURL;
// }

// if ($(".displayCards").on("click")) {
//   console.log("You clicked card sets")
//    var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/";
//   console.log(queryURL);
//   var $selection = $(".displayCards");
// } else if ($(".classes").on("click")) {
//   console.log("you've clicked classes")
//   var classes = $(this).text();
//   var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/" + classes;
//   console.log(queryURL);
//   var $selection = $(".classes");
// }

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

      length = cardSets[replace];

      //should be able to read the correct length for classes, types, etc if the queryURL would change based on what the user clicked
      // if ($(".displayCards").data("clicked") === true) {
      //   console.log(length);
      // } 
      // else if ($(".classes").on("click")) {
      //   length = cardSets;
      //   console.log(length);
      // }

      for (var i = 0; i < length.length; i++) {
        var card = length[i];
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
  });

  //   database functions
  var databaseRef = {
    pushCard: () => {
      database.ref().push({
  
      });
  
      databaseRef.pullChild();
  
    },
    pullChild: () => {
      var filter = database.ref().orderByChild("dateAdded").limitToLast(1)
      filter.once("child_added", function(child) {
  
        trainTable.updateTrainTable();
      });
  
    },
  
    databasePull: () => {
  
      database.ref().on("value", function(snapshot) {
  
  
      }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
  
      });
    }
  
  }

  // jQuery('#id').click(function(){
  //   $(this).data('clicked', true);
  // });

  // if(jQuery('#id').data('clicked')) {
  //   //clicked element, do-some-stuff
  // } else {
  //   //run function2
  // }

  // $(".classes").click(function() {
  //   $(this).data('clicked', true);
  // });

  // if ($(".classes").data("clicked") === true) {
  //   var classOfCards = $(".classes").text();
  //   console.log(classOfCards);
  //   console.log("you clicked classes")
  //   var $selection = $(".classes");
  //   var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/" + classOfCards;
  // } else if ($(".type").data("clicked") === true) {
  //   console.log("you clicked types")
  //   var $selection = $(".type");
  //   var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/types/" + classOfCards;
  // }


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
    .then(function(response) {
      console.log(response);

      $(".cardsDisplay").empty();

      console.log(response.length);

      for (var i = 0; i < response.length; i++) {
        var card = response[i];
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

  $(".types").on("click", function() {
    
    var classOfCards = $(this).text();
    console.log(classOfCards)

    var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/types/" + classOfCards;

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "X-Mashape-Key": "rruq02mvUemshfKdA9mFcE1IYPZhp1qP0yBjsnNFN9a6djXXv6"
      }
    })
    //determines what to do with the information recieved
    .then(function(response) {
      console.log(response);

      $(".cardsDisplay").empty();

      console.log(response.length);

      for (var i = 0; i < response.length; i++) {
        var card = response[i];
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

  $(".factions").on("click", function() {
    
    var classOfCards = $(this).text();
    console.log(classOfCards)

    var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/factions/" + classOfCards;

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "X-Mashape-Key": "rruq02mvUemshfKdA9mFcE1IYPZhp1qP0yBjsnNFN9a6djXXv6"
      }
    })
    //determines what to do with the information recieved
    .then(function(response) {
      console.log(response);

      $(".cardsDisplay").empty();

      console.log(response.length);

      for (var i = 0; i < response.length; i++) {
        var card = response[i];
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

  $(".qualities").on("click", function() {
    
    var classOfCards = $(this).text();
    console.log(classOfCards)

    var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/qualities/" + classOfCards;

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "X-Mashape-Key": "rruq02mvUemshfKdA9mFcE1IYPZhp1qP0yBjsnNFN9a6djXXv6"
      }
    })
    //determines what to do with the information recieved
    .then(function(response) {
      console.log(response);

      $(".cardsDisplay").empty();

      console.log(response.length);

      for (var i = 0; i < response.length; i++) {
        var card = response[i];
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

  $(".races").on("click", function() {
    
    var classOfCards = $(this).text();
    console.log(classOfCards)

    var queryURL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/races/" + classOfCards;

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "X-Mashape-Key": "rruq02mvUemshfKdA9mFcE1IYPZhp1qP0yBjsnNFN9a6djXXv6"
      }
    })
    //determines what to do with the information recieved
    .then(function(response) {
      console.log(response);

      $(".cardsDisplay").empty();

      console.log(response.length);

      for (var i = 0; i < response.length; i++) {
        var card = response[i];
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
var playerArray=["player", "player2","player3","player4"]
var playerIDs=["e9Y9Mavpvfc","pUH30gok49s","jAp6nnKgQp8","eFug8TO6WrE"]
function onYouTubeIframeAPIReady() {
  for (var i=0; i<4;i++) {

    player = new YT.Player(playerArray[i], {
    height: '390',
    width: '640',
    videoId: playerIDs[i],
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  } 
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
