/**** Images links */
const link1 ="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg";
const link2 ="https://images.squarespace-cdn.com/content/v1/6058f3b0dbb27b03bbd36be9/1616442358480-QB4FPW98SIE28C82E87X/interstellar_ron_burnett_critical_approaches?format=150";

const link3 ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu6sb_iSM6jHqCXZkztC9RIEOGXx_diYsoLkJR5sUIMqkxpjOfr-ZJxaP9P3zQQPt3v0g&usqp=CAU";
const link4 = "https://i.pinimg.com/236x/6b/73/ff/6b73ff959566a9cc921004044225a5dd.jpg";

const link5 = "https://i.pinimg.com/236x/71/5c/76/715c76f46d96a63196bf448dac1c6b73.jpg";
const link6 = "https://i.pinimg.com/236x/76/c3/6f/76c36fe8233faa9a2edb4bac03976267.jpg";

const link7 ="https://i.pinimg.com/564x/88/1d/87/881d87e9fa672b894170d01e48cced34.jpg"

/******** making a watchlist and movie objects ********/
function makeWatchlist() {
  return {
    watchlist: [],
    addMovie,
    rateMovie,
    sortByRating,
    sortByWatchDate,
    displayWatchedMovies,
    displayWatchlist,
    createContext,
  };
}
var watchedMovies = [];
function movie(title, director, actors, category, streamingService, images) {
  var instance = {};
  instance.title = title;
  instance.director = director;
  instance.actors = actors;
  instance.category = category;
  instance.streamingService = streamingService;
  instance.rating = 0;
  instance.watchDate;
  instance.images = images;
  return instance;
}

var watchlist = makeWatchlist();

var movie1 = movie(
  "Interstellar",
  "Christopher Nolan",
  ["Mathew McConaughy", "Anne Hathaway", "Jessica Chastain"],
  "Sc fi",
  ["Amazon", "AppleTv"],
  [link1, link2]
);
var movie2 = movie(
  "Inception",
  "Christopher Nolan",
  ["Leonardo Dicaprio", "Tom Hardy", "Cillian Murphy"],
  "Sc fi",
  ["netflix", "apple tv"],
  [link3, link4]
);
var movie3 = movie(
  "How to lose a guy in 10 days",
  "Donald Petrie",
  ["Mathew McConaughy", "Kate Hudson"],
  "Romantic comedy",
  ["Amazon", "netflix"],
  [link5, link6]
);

var movie4= movie('Inglorious basterds','Quentin Tarantino', 
["Brad Pitt","Christoph Waltz",'Melanie Laurent'],
"Drama",
["netflix"],
[link7]
)

watchlist.addMovie(movie1);
watchlist.addMovie(movie2);
watchlist.addMovie(movie3);
watchlist.addMovie(movie4);

/********display watchlist  *******/
$(document).ready(function () {
  context.displayWatchlist();
});
/****** display watched movies on clich *********/
$("#watchedmovies").click(function () {
  context.displayWatchedMovies();
});
/**************ADD MOVIE *************/
function addMovie(movie) {
  this.watchlist.push(movie);
}

/**************RATE MOVIE *************/
function rateMovie(movie, rating) {
  return this.watchedMovies.map((element) => {
    if (element === movie) element.rating = rating;
  });
}
/************** SORT BY RATING (not update to work on the html page) *************/
function compareRating(a, b) {
  return b.rating - context.rating;
}
function sortByRating() {
  return this.watchedMovies.sort(compareRating);
}

function sortByRating() {
  $("#sortR").on("click", function () {
    context.watchedMovies.sort(compareRating);
    context.displayWatchedMovies();
  });
}

/************** SORT BY Date (not update to work on the html page) *************/
function compareDate(a, b) {
  return a.watchDate - b.watchDate;
}
function sortByWatchDate() {
  this.watchedMovies.sort(compareDate);
}


/************** Search and Watch ********************/
var context;
function createContext() {
  context = this;
  console.log(context);
}
watchlist.createContext();

$(".clickclick").click(function () {
  var value = $("#searchInput").val();
  var criteria = $(".Options").val();
  if (criteria === "actors" || criteria === "streamingService") {
    context.watchlist = context.watchlist.filter((element) => {
      return element[criteria].includes(value);
    });
    return;
  }
  context.watchlist = context.watchlist.filter((element) => {
    return element[criteria] === value;
  });
  context.displayWatchlist();
});

$(document).ready(function () {
  $(".Movie").click(function () {
    var temp = context.watchlist;
    watchedMovies.push(temp[$(this).attr("id")]);
    context.watchlist.splice($(this).attr("id"), 1);
    context.displayWatchlist();
  });
});

$("#searchInput").change(function (){
  console.log($("#searchInput").val());
  if ($("#searchInput").val()) {
    $(".clickclick").prop("disabled", false);
  }
});

/*******************DISPLAY FUNCTIONS ******************/
function displayMovie(movie, id) {
  $("#movies").append(`<button id=${id} class="Movie"> 
    <img   src=${movie.images[0]}><h2>${movie.title}</h2> directed By <h2>${movie.director}</h2> featuring <h2>${movie.actors[0]}</h2></button>`);
}

function displayWatchlist() {
  $("#movies").empty();
  this.watchlist.map(function (element, id) {
    displayMovie(element, id);
  });
}

function displayWatchedMovies() {
  $("#movies").empty();
  watchedMovies.map(function (element, id) {
    $("#movies").append(`<button id=${id} class="Movie"> 
    <img   src=${element.images[0]}><h2>${element.title}</h2> directed By <h2>${element.director}</h2> featuring <h2>${element.actors[0]}</h2></button>`);
  });
}
