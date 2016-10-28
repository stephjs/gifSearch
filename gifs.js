var gifArray = ["panda", "haha", "puppies", "funny", "hug", "surprise", "yay"];

function aNewButton(what) {
	var newButton = $("<button></button>");
	newButton.addClass("cutegif");
	newButton.attr("data-name", what);
	newButton.text(what);
	$("#buttonsHere").append(newButton);
}

for (i=0; i<gifArray.length; i++){
	aNewButton(gifArray[i]);
}

$("#getGifs").on("submit", function() {
	var userGif = $("#gifInput").val().trim();
	console.log(userGif);
	aNewButton(userGif);
	return false;
});


$(".cutegif").click(function(){
	alert("qjewkrlj");
	var gif = $(this).data('name');
	alert("Please be patient as your "+gif+" gifs load.");
	$("#first").empty();
	$("#second").empty();
	$("#third").empty();
	$("#fourth").empty();
	var gifNumber = "&limit=100";
	var apiKey = "&api_key=dc6zaTOxFJmzC&limit=10";
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + gifNumber +apiKey;

	//$("#first").append("<h1>Hi!</h1>");
	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {
            var gifInfo = response.data;


            function gifStuff (zero, meow, where) {
            	for (var i = zero; i < meow; i++) {
	                var gifDiv = $('<div class="helloGifs">');
	                var rating = gifInfo[i].rating;
	                //var ratingText = $('<p class="textRating">').text("Rated " + rating);
	                var actualGif = $('<img>');
	                actualGif.attr('src', gifInfo[i].images.fixed_height.url);

	                //append the rating and image
	                //gifDiv.append(ratingText);
	                gifDiv.append(actualGif);

	                where.append(gifDiv);
	                // $("#first").append("<h1>Hi!</h1>");
	            }

            }
            gifStuff(0, 26, $("#first"));
            gifStuff(26, 51, $("#second"));
            gifStuff(51, 76, $("#third"));
            gifStuff(76, 101, $("#fourth"));
            // for (var i = 0; i < 26; i++) {
            //     var gifDiv = $('<div class="helloGifs">');
            //     var rating = gifInfo[i].rating;
            //     //var ratingText = $('<p class="textRating">').text("Rated " + rating);
            //     var actualGif = $('<img>');
            //     actualGif.attr('src', gifInfo[i].images.fixed_height.url);

            //     //append the rating and image
            //     //gifDiv.append(ratingText);
            //     gifDiv.append(actualGif);

            //     $("#first").append(gifDiv);
            //     // $("#first").append("<h1>Hi!</h1>");
            // }

        });
});