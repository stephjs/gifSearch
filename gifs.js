var gifArray = ["cats", "lima beans", "stars", "game of thrones", "haha", "surprise", "yay", "spooky", "shark", "hipsters", "water", "ugh", "nature", "america", "roller coaster", "frozen"];

$(document).ready(function() {

	dothatShit();
	function dothatShit(){
		for (i=0; i<gifArray.length; i++){
			aNewButton(gifArray[i]);
		}
	}

	function aNewButton(what) {
		var newButton = $("<button></button>");
		newButton.addClass("cutegif");
		newButton.attr("data-name", what);
		newButton.text(what.toUpperCase());
		$("#buttonsHere").append(newButton);
		console.log("I did it all!");

		$(".cutegif").on("click", function(){
			var gif = $(this).data('name');
			$("#first").empty();
			$("#second").empty();
			$("#third").empty();
			$("#fourth").empty();
			var gifNumber = "&limit=100";
			var apiKey = "&api_key=dc6zaTOxFJmzC&limit=10";
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + gifNumber +apiKey;

			function gifStuff (zero, meow, where) {
			$.ajax({url: queryURL, method: 'GET'})
				.done(function(response) {
		            var gifInfo = response.data;

	            	for (var i = zero; i < meow; i++) {
		                var gifDiv = $('<div class="helloGifs">')
		                var actualGif = $('<img>');
		                var animated = gifInfo[i].images.fixed_height.url;
             			var still = gifInfo[i].images.fixed_height_still.url;
             			actualGif.attr('src', animated);
			            actualGif.attr('data-still', still);
			            actualGif.attr('data-animated', animated);
			            actualGif.attr('data-state', 'animated')
			            actualGif.addClass("imaGIF");
		                gifDiv.append(actualGif);
		                where.append(gifDiv);
		            }
		        });
		   	}

			gifStuff(0, 25, $("#first"));
	        gifStuff(25, 50, $("#second"));
	        gifStuff(50, 75, $("#third"));
	        gifStuff(75, 100, $("#fourth"));
		});
	}

	$("#getGifs").submit(function() {
		$("#buttonsHere").empty();
		var userGif = $("#gifInput").val().trim();
		gifArray.push(userGif);
		console.log(gifArray);
		dothatShit();
		$("form").trigger("reset");
		return false;

	});
});

$(document).on('click', '.imaGIF', function(){
	var state = $(this).data('state');
	console.log(state);
    if ( state == 'still') {
        $(this).data('state', 'animated');
        $(this).attr('src', $(this).data('animated'));
        
    }else if (state == "animated") {
        $(this).data('state', 'still');
        $(this).attr('src', $(this).data('still'));
        
    }
});