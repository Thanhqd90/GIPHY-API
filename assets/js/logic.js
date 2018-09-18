$(document).ready(function() {

var baseUrl = "http://api.giphy.com/v1/gifs/search?q=";
var apikey = "&api_key=jpnxSbDkR1m61R1felUvixI0YfuJ0T2s&limit=10";
var query = "pokemon"
var giflink;

var base = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Eevee", "Abra", "Lapras", "Meowth", "Koffing", "Ekans", "Grimer", "Mewtwo"];

// May or may not need these variables
//var current; 
//var paused; 
//var animated; 

$.ajax({
    url: (baseUrl + query + apikey),
    method: 'GET',
    }) //Returns information from remote sever and passes it as response in the annonymous function
.then(function(response){ 
    console.log(response);

    for(var i = 0; i < base.length; i++){
        $(".gifb").append(`<div class="d-inline pl-2"><button type="button" class="btn btn-dark btn-lg">${base[i]}</button></div>`);
    }
    
    for(var i = 0; i < 10; i++){
    giflink = response.data[i].images.original.url;
    $(`#giffy${i}`).append(`<img height="250px" width="250px" src="${giflink}">`);
    loglink();
    }
});

function loglink() {
    console.log(giflink);
    }

});