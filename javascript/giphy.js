// delete this completely or change this to animals
var animals = ["cat", "dog", "cow", "horse"];

function displayanimalInfo() {
    $("#animals-view1").empty();
    $("#animals-view2").empty();
    $("#animals-view3").empty();
    var animal = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var animalArr = response.data
        for (var i = 0; i < animalArr.length; i++) {
            var animatedImageUrl = animalArr[i].images.fixed_height.url;
            var stillImageUrl = animalArr[i].images.fixed_height_still.url;
            var animalImage = $("<img>");
            animalImage.attr("src", stillImageUrl);
            animalImage.attr("data-still", stillImageUrl)
            animalImage.attr("data-animate", animatedImageUrl)
            animalImage.attr("data-state", "still")
            animalImage.attr("width", "30%")
            animalImage.attr("height", "120em")
            animalImage.addClass("animalGif")
            var animalRating = $("<p>")
            animalRating = animalArr[i].rating
            if (i < 3) {
                $("#animals-view1").append(animalRating);
                $("#animals-view1").append(animalImage);
            }
            if (i >= 3 && i < 6) {
                $("#animals-view2").append(animalRating);
                $("#animals-view2").append(animalImage);
            }
            if (i >= 6 && i < 9) {
                $("#animals-view3").append(animalRating);
                $("#animals-view3").append(animalImage);
            }
        }
    });
    //}
}
function renderButtons() {
    $("#buttons-view").empty();

    // Loops through the array of animal giphy's
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add animal button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var animal = $("#animal-input").val().trim();

    // The animal from the textbox is then added to our array
    animals.push(animal);

    // Calling renderButtons which handles the processing of our animal array
    renderButtons();

});

// Adding click event listeners to all elements with a class of "animal"
$(document).on("click", ".animal", displayanimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

$(document).on("click", ".animalGif", function () {
    alert("working")
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