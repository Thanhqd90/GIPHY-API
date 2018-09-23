$(document).ready(function () {

  // Default buttons on page
  var pokemons = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Rhydon", "Butterfree", "Lapras", "Vulpix", "Mewtwo"];


  // Function to display gifs with AJAX call
  function displayGifs() {

    var pokemon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pokemon + "&api_key=jpnxSbDkR1m61R1felUvixI0YfuJ0T2s&limit=10";

    // Create an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)

      var newDiv = $("<div class='pokemonGifs'>");

      $("#gif-view").empty();
      for (var i = 0; i < 10; i++) {

        // JSON path
        var gifTitle = response.data[i].title;
        var gifRating = response.data[i].rating;
        var gifURL = response.data[i].images.original.url;
        var gifStill = response.data[i].images.original_still.url;

        // Append gifs inside of a card body with template literals
        newDiv.append(`
          <div class="floatL text-center card border-success mb-3" style="max-width: auto;">
            <div class="card-header bg-transparent border-success">${gifTitle.toUpperCase()}</div>
              <div class="card-body text-success">
                <h5 class="card-title">Rating: ${gifRating.toUpperCase()}</h5>
                  <p class="card-text"></p>
                <img data-state="still" data-still="${gifStill}" data-animate="${gifURL}"class ="gif-img gifSize" src="${gifStill}">
              </div>
            <div class="card-footer bg-transparent border-success">       
              <a href="${gifURL}" download="${pokemons[i]} gif">Download GIF (right click and choose save as)<i class="p-3 fas fa-arrow-circle-down"></i></a><br>Add GIF to Favorites <i class="p-3 far fa-star"></i></div>
            </div>
          </div>`);
      }
      $("#gif-view").append(newDiv);
    });
  }

  //Create buttons for top and bottom containers
  function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < pokemons.length; i++) {
      var button = $("<button>").addClass("gif-btn p-2 m-1 btn btn-dark btn").attr("data-name", pokemons[i]).text(pokemons[i]);
      $("#buttons-view").append(button);
    }
  }

  function renderNewButtons() {
    $("#custom").empty();
    for (var i = 12; i < pokemons.length; i++) {
      var button = $("<button>").addClass("gif-btn p-2 m-1 btn btn-dark btn").attr("data-name", pokemons[i]).text(pokemons[i]);
      $("#custom").append(button);
    }
  }

  // Click event listener for new gif buttons
  $(document.body).on("click", "#add-gif", function (event) {
    event.preventDefault();
    var pokemon = $("#gif-input").val().trim();
    
    if (pokemon === "") {
      return pokemon;
    }
      pokemons.push(pokemon);
      renderNewButtons();
      pokemon.val("");
  });

  // Clear gifs on click
  $("#remove-gif").on("click", function () {
    $("#gif-view").empty()
  });

  $(document).on("click", ".gif-btn", displayGifs);

  // Renders default buttons
  renderButtons();

  // Animate gifs
  $(document.body).on("click", ".gif-img", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
      }
    });
}); //Document.ready end