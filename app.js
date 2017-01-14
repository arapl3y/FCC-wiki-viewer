var app = {};

app.init = function() {
  // Initialise search on click
  $('#search').on('click', app.onSearch);

	// Initialise search on enter
	$("#input").keypress(function(e) {
		if ((e.keyCode || e.which) == '13') {
			$('#search').click();
		}
	});
};

app.onSearch = function() {
  var input = $('#input').val();
  app.url = "//en.wikipedia.org/w/api.php?action=opensearch&search=" + input + "&format=json&callback=?";

  $.getJSON(app.url).then(app.gotData, app.gotError);
  $('#input').val("");
};

app.gotData = function(data) {
  //Error test
  if (data.error) {
    alert(data.error.info);
    return;
  }

  //Render results
  app.titles = data[1];
  app.descriptions = data[2];
  app.links = data[3];

  var itemTemplate = $('#itemTemplate').html();

  $('.output').empty();

  for (var i = 0; i < app.titles.length; i++) {
    app.title = app.titles[i];
    app.description = app.descriptions[i];
    app.link = app.links[i];

    // If any item's description contains "may refer to", skip loop cycle
    if (app.description.match(/may refer to/i)) {
      continue;
    }
    // If any item has an empty description...
    if (app.description === '') {
      app.description = "The description is missing.";
    }

    app.item = $(itemTemplate);
    app.item.find(".title").text(app.title + ": ");
    app.item.find(".description").text(app.description);
    app.item.find(".link").attr("href", app.link);
    $('.output').append(app.item).hide().fadeIn();
  }
};

app.gotError = function(err) {
  alert("Error");
};

$(document).ready(app.init);
