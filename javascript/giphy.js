// delete this completely or change this to topic
var topic = ["cat", "dog", "cow", "horse"];
function displaytopicInfo() {
    for (var i = 0; i < 9; i++){
    $("#topics-view" + (i+1)).empty();
    }
    var topic = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var topicArr = response.data
        for (var i = 0; i < topicArr.length; i++) {
            var animatedImageUrl = topicArr[i].images.fixed_height.url;
            var stillImageUrl = topicArr[i].images.fixed_height_still.url;
            var topicImage = $("<img>");
            topicImage.attr("src", stillImageUrl);
            topicImage.attr("data-still", stillImageUrl)
            topicImage.attr("data-animate", animatedImageUrl)
            topicImage.attr("data-state", "still")
            topicImage.attr("width", "80%")
            topicImage.attr("height", "120em")
            topicImage.addClass("topicGif")
            var topicRating = $("<p>")
            topicRating = topicArr[i].rating
            

            $("#topics-view" + i).append("Rating: " + topicRating + "<br>");
            $("#topics-view" + i).append(topicImage);

        }
    });

}
function renderButtons() {
    $("#buttons-view").empty();

    // Loops through the array of topic giphy's
    for (var i = 0; i < topic.length; i++) {
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", topic[i]);
        a.text(topic[i]);
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add topic button is clicked
$("#add-topic").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var newTopic = $("#topic-input").val().trim();

    // The topic from the textbox is then added to our array
    topic.push(newTopic);

    // Calling renderButtons which handles the processing of our topic array
    renderButtons();
    $("#topic-input").val("")

});

// Adding click event listeners to all elements with a class of "topic"
$(document).on("click", ".topic", displaytopicInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

$(document).on("click", ".topicGif", function () {
    var state = $(this).attr("data-state");

    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else if (state == "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }

});