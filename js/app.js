/*
  Please add all Javascript code to this file.
*/

'use strict';




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
		$('.hidden').show();
		var selectedSource = $('#NewsSources li.selected a').attr('data-grab');
		var request = $.ajax({
			url: selectedSource,
			success: findRss
			 //ajax request
		}); 

});

// compile HTML function

var compileHtml = function (articleHtml) {
	var articleTemplate = $('#article-template').html();
	var articleScript = Handlebars.compile(articleTemplate);
	return articleScript(articleHtml);

}


// create a function for each Digg, Mashable, Reddit

	 var findRss = function(data) {
	 	var rssSearch = $('#sourceName').text();
	 	$('.hidden').hide();
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
		var posterUrl = data.data.feed[0].content.media.images[0].url;
	// 	 for loop to loop through data
	$('#main').html('');
	for (var i = 0; i < 4; i ++ ) {
		var feed = data.data.feed[i];
		var articleObj = {
			articlePoster: feed.content.media.images[0].original_url,
			impressions: feed.fb_shares.count,
			lifestyle: feed.content.description,
			articleTitle: feed.content.title_alt,
			articleUrl: feed.content.original_url
			};

	// 		 compile HTML from object -- clean this up before Monday (compile into seperate function)
		var articleHtml = compileHtml(articleObj);
		$('#main').append(articleHtml);



		} // for loop
	 } // populate Digg function

	// populate Mashable function

	var populateMashable = function(data) {
	// 	 for loop to loop through data
	$('#main').html('');
	for (var i = 0; i < 4; i ++ ) {
		var feed = data.new[i];
		var articleObj = {
			articlePoster: feed.image,
			impressions: feed.shares.total,
			lifestyle: feed.excerpt,
			articleTitle: feed.title,
			articleUrl: feed.link
			};

		var articleHtml = compileHtml(articleObj);
		$('#main').append(articleHtml);



		} // for loop
	 } // end populate Mashable function
	


// populate Reddit function

	var populateReddit = function(data) {
	console.log(data);
	console.log(data.data.children[0].data.title);
	$('#main').html('');
	for (var i = 0; i < 4; i ++ ) {
		var feed = data.data.children[i];
		var articleObj = {
			articlePoster: feed.data.thumbnail,
			impressions: feed.data.ups,
			lifestyle: '',
			articleTitle: feed.data.title,
			articleUrl: 'https://www.reddit.com/' + feed.data.permalink
			};

		var articleHtml = compileHtml(articleObj);
		$('#main').append(articleHtml);
		} // for loop
	} // end of Reddit function


  

}); //document ready function