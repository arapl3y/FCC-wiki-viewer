function gotData(data) {
    //Error test
    if (data.error) {
        alert(data.error.info);
        return;
    }

    //Render results
    var titles = data[1];
    var descriptions = data[2];
    var links = data[3];

    var itemTemplate = $('#itemTemplate').html();

    $('.output').empty();

    for (var i = 0; i < titles.length; i++) {
        title = titles[i];
        description = descriptions[i];
        //If any item contains "may refer to" skip loop cycle
        if (description.match(/may refer to/i)) {
            continue;
        }

        if (description === '') {
            description = "The description is missing.";
        }

        link = links[i];

        item = $(itemTemplate);

        item.find(".title").text(title + ": ");
        item.find(".description").text(description);
        item.find(".link").attr("href", link);
        $('.output').append(item).hide().fadeIn();
    }
}

function gotError(err) {
    alert("Error");
}

function onSearch() {
    var input = $('#input').val();
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + input + "&format=json&callback=?";


    $.getJSON(url).then(gotData, gotError);
    $('#input').val("");
}

//Initialise page
$('#search').on('click', onSearch);
