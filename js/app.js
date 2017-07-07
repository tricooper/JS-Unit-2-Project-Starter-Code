/*
  Please add all Javascript code to this file.
*/

'use strict';

var DiggRss = {

};

var MashableRss = {

};

var RedditRss = {

};

var diggUrl= "https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json"

// Take li Content and Output it on the News Source

$('body').on('click', '#NewsSources li', function(){
	var dropdownText = $(this).text();
	$('#sourceName').text(dropdownText);
	$(this).siblings().removeClass('selected');
	$(this).addClass('selected');


})

// create a request to search for articles when 'search' is clicked

$(document).ready(function() {
		$('body').on('click', '#search', function(){
		var selectedSource = $('#NewsSources li.selected a').attr('data-grab');
		var request = $.ajax({
			url: selectedSource,
			success: findRss
			 //ajax request

		}); 

});


// create a function for each Digg, Mashable, Reddit

	 var findRss = function(data) {
	 	var rssSearch = $('#sourceName').text();
		if (rssSearch === 'Digg') {
			populateDigg(data);
			
		} else if (rssSearch === 'Mashable') {
			populateMashable(data); 

		} else {
			populateReddit(data); 
		}

	}

	// populate Digg function

	var populateDigg = function(data) {
		console.log(data);
		console.log(data.data.feed[0].content.media.images[0].url);
		var posterUrl = data.data.feed[0].content.media.images[0].url;
	// 	var poster = 
	// 	// for loop to loop through data

	// 		// compile HTML from object

	// 		// append HTML
	 }

	// populate Mashable function

	var populateMashable = function(data) {
		console.log(data);
	}


	// populate Reddit function

	var populateReddit = function(data) {
		console.log(data);
	}


  

}); //document ready function