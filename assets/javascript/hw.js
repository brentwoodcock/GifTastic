// Starting list of button topics
var topics = ["The Office", "Game of Thrones", "Stranger Things", "Curb Your Enthusiasm", "The Wire", "Breaking Bad", "Fargo", "Sherlock", "Parks and Recreation", "Seinfeld", "House of Cards", "Black Mirror", "Top Gear", "Peaky Blinders", "Better Call Saul", "Mr Robot", "Louie", "Silicon Valley", "Utopia", "Trailer Park Boys", ]

// Giphy API url
var queryUrl = "http://api.giphy.com/v1/gifs/search";
// Giphy API public API Key
var apiKey = "dc6zaTOxFJmzC";
// Limit on number of gifs
var limit = 10;
// Rating limit on gifs
var rating = "pg-13";

$(document).ready(function(){

	// Create and append a button to buttonsContainer
	function createButton(text){
		var btn = $("<div class='btn btn-primary topicBtn'>" + text + "</div>");
		$("#buttonsContainer").append(btn);
	}

	// Add a button from user's input
	function addButton(){
		var input = $("#userInput").val().trim();
		// Check user's input for duplicates or empty input
		if (topics.indexOf(input.toLowerCase()) != -1){
			alert("You must enter a unique TV Show");
			$("#userInput").val("");
		}else if(input == ""){
			alert("You must enter a TV Show");
		}else{
			createButton(input);
			$("#userInput").val("");
			topics.push(input.toLowerCase());
		}
	}

	// Grab gifs from Giphy API for a topic and update HTML
	function queryGiphy(topic){
		$.ajax({
			url: queryUrl,
			method: 'GET',
			data: {
				api_key: apiKey,
				q: topic,
				limit: limit,
				rating: rating
			}
		}).done(function(response){
			console.log(response);
			$("#gifsContainer").empty();
			for (var i = 0; i < limit; i++) {
				var box = $("<div style='display: inline-block;'><p class='rating'>Rating: " + response.data[i].rating + "</p></div>");
				var gif = $("<img src=" + response.data[i].images.fixed_height_still.url + " class='gif' data-state='still' data-stillUrl=" + response.data[i].images.fixed_height_still.url + " data-animateUrl=" + response.data[i].images.fixed_height.url + " alt='a'>");
				box.append(gif);
				$("#gifsContainer").append(box);
			}
		})
	}

	// Add starting buttons from topics
	for (var i = 0; i < topics.length; i++) {
		createButton(topics[i]);
		topics[i] = topics[i].toLowerCase();
	}

	// Add a user's button from input
	$("#add").on("click", function(){
		addButton();
	})

	// Add a user's button when Enter key is pressed
	$(document).keypress(function(e){
		if (e.which == 13){
			addButton();
		}
	})

	// Query the Giphy API for a topic according to the button pressed
	$(".topicBtn").on("click", function(){
		var topic = $(this).text();
		console.log(topic);
		queryGiphy(topic);
	})

	// Play or pause a gif when clicked
	$(".gif").on("click", function(){
		console.log("clicked");
		if ($(this).data("state") == "still"){
			$(this).attr("src", $(this).data("animateUrl"));
			$(this).data("state", "animate");
		}else{
			$(this).attr("src", $(this).data("stillUrl"));
			$(this).data("state", "still");
		}
	})
})