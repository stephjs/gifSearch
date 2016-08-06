//need an array to hold different gifs
//also need the ability to add to this array with user input
var gifArray = ["puppies", "oops", "silly", "elsa", "ocean", "zayn", "falling", "bored", "hipsters"];

//need to make the buttons at the top of the page
//clicking a button will call gifs like that to populate the page
function makeButtons() {
	//empty the buttons div every time or it makes duplicates
	$("#buttonsHere").empty();

	//a loop can go through the gif Array and make a button for each tag in the array
	for (i=0; i<gifArray.length; i++) {
		var eachButton = $("<button></button>");
		//now we can refer to buttons as .cutegif for jquery stuffz
		eachButton.addClass("cutegif");
		//the array name like "dogs" is also now the name attribute
		eachButton.attr("data-name", gifArray[i]);
		eachButton.text(gifArray[i]);
		//puts all the buttons at the top of the page in the div
		$("#buttonsHere").append(eachButton);
	}
}
//calls the function, makes the buttons for gifs
makeButtons();


//user needs to be able to add gif tags
function userButtons() {
	$("#gifButton").click(function() {
		//creating a variable to represent user input
		//.val gets the value, .trim fixes it if there's shifts or anything weird
		var userInput = $("#gifInput").val().trim();
		//now we can add user input to the end of gifArray
		gifArray.push(userInput);
		//empty the buttons array before running the function to add buttons again
		//$("#buttonsHere").empty();
		//rerun the function to make buttons
		makeButtons();
		//fixes bugs. without it can't add new buttons for some reason
		return false;
	});
}
//calls the function, user can now add tags to make gifs
userButtons();


//API STUFF
//function to get the cute gifs
$(".cutegif").click(function(){
	$("body").css('background-image', 'none');
	$("body").css("background-color", "#003462");
	//empty the gif bucket every time we click for new gifs
	$('#gifBucket').empty();

	//defining gif and queryURL for the API
	var gif = $(this).data('name');
	//increases number of gifs from 10 to 100
	//gifs for dayyyyyyys
	var gifNumber = "&limit=100";
	var apiKey = "&api_key=dc6zaTOxFJmzC&limit=10";
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + gifNumber +apiKey;

	//ajax where u at?
	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {
            var gifInfo = response.data;

            // for (var i = 0; i < gifInfo.length; i++) {
            //         var gifDiv = $("<div class='helloGifs'>");
            //         var rating = $("<p>").text("Rated "+rating);
            //         var rating = gifInfo[i].rating;

            //         var realGif = $("<img>");
            //         realGif.attr("src", gifInfo[i].images.fixed_height.url);
            //         gifDiv.append(p);
            //         gifDiv.append(realGif);
            //         $("#gifBucket").append(gifDiv);



            //better than writing this 100 times
            for (var i = 0; i < gifInfo.length; i++) {
            	//a div to hold each div, makes styling easy peasy
                var gifDiv = $('<div class="helloGifs">');
                //we want to see the rating of each gif
                var rating = gifInfo[i].rating;
                var ratingText = $('<p class="textRating">').text("Rated " + rating);
                //this will hold information about image source
                var actualGif = $('<img>');
                actualGif.attr('src', gifInfo[i].images.fixed_height.url);

                var stillGif = $('<img>');
                stillGif.attr('src', gifInfo[i].images.fixed_height_still.url);

                //append the rating and image
                gifDiv.append(ratingText);
                gifDiv.append(stillGif);

                $("#gifBucket").append(gifDiv);


                //still to live
                stillGif.click(function(){
                	$(this).attr('src', gifInfo.images.fixed_height.url);
                	gifDiv.append(this);
                });

                //live to still
                actualGif.click(function(){
                	$(this).attr('src', gifInfo.images.fixed_height_still.url);
                	gifDiv.append(this);
                });

            }

        });
});