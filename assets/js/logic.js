$(document).ready(function() {

var queryUrl = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=jpnxSbDkR1m61R1felUvixI0YfuJ0T2s&limit=10";

var giflink;

$.ajax({
    url: queryUrl,
    method: 'GET',
    }) //Returns information from remote sever and passes it as response in the annonymous function
.then(function(response){ 
    console.log(response);
    
    giflink = response.data[4].url;
    $("#title").text(giflink);
    loglink();
});

function loglink() {
    console.log(giflink);
    }

});