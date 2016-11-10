(function(window) {

  /* initial GIFbuttonArray */
  var martialGIFs = ['Naruto', 'Halo 2', 'Halo 3', 'Halo', 'Destiny', '300', 'Turtles', 'Bugs Bunny', 'Saske', 'Kubo', 'The Tic', 'Superman',
  'Captain America', 'Hulk', 'Spiderman', 'Deadpool', 'iron man', 'Destiny', 'the Purge', 'Ninja ', 'Dory'];

  function displayMartialGIF() {

    var martialGIF = $(this).attr('data-name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + martialGIF + "&api_key=dc6zaTOxFJmzC&limit=10";

    // AJAX call
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
      var GiphyArray = response.data;
      // new <div>
      var g;
      for (g = 0; g < GiphyArray.length; g++) {
        var martialGIFdiv = $('<div class="martialGiphy">');
      // create GIF
      var GIFimg = $('<img>');

      GIFimg.attr("src", GiphyArray[g].images.fixed_width_still.url);
      GIFimg.attr("data-still", GiphyArray[g].images.fixed_width_still.url);
      GIFimg.attr("data-animate", GiphyArray[g].images.fixed_width.url);
      GIFimg.attr("data-state", "still");
      GIFimg.addClass("GIFimage");
      martialGIFdiv.append(GIFimg);
      
      $('#martialGiphyView').prepend(martialGIFdiv);

      };
      // retrieves rating data
      var rating = response.data[0].rating;

      // rating element creation
      var pRating = $('<p>').text("Rating = " + rating);

      // display rating
      martialGIFdiv.prepend(pRating);
    });

  }

  function renderButtons() {
    //prevents repeat buttons
    $('#buttonsView').empty();
    for (var i = 0; i < martialGIFs.length; i++) {
      var a = $('<button>') //generate-button
      a.addClass('martialGIF'); //add a class
      a.attr('data-name', martialGIFs[i]); //add a data-attribute
      a.text(martialGIFs[i]); //provide initial button text
      $('#buttonsView').append(a); //add the button to HTML
    }
  };

  $('#addMartialGIF').on('click', function() {
    //grab the input from the textbox
    var martialGIF = $('#martialGIF_input').val().trim();

    //martial-arts query from the textbox is added to the array
    martialGIFs.push(martialGIF);

    //so that users can hit "enter" instead of clicking on the button and it won't move to the next page
    return false;
  });

  function animateGIF() {
  		var state = $(this).attr("data-state");
  		//animation toggle
  		if (state == 'still') {
  	        $(this).attr("src", $(this).data('animate'));
  	        $(this).attr('data-state', 'animate');
  	    }
  	    if (state == 'animate') {
  	        $(this).attr("src", $(this).data('still'));
  	        $(this).attr('data-state', 'still');
  	    }
  	}
  	//run functions
  	$('#martialGiphyView').on('click','.GIFimage', animateGIF);
  	$(document).on('click','.martialGIF', displayMartialGIF);
  	$(document).on('click','#martialGIF_input', renderButtons);

renderButtons();

})(window);
