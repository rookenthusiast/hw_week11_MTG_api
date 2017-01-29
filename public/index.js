var allCards = null;
var clicks = 1

// returns all cards from a single endpoint, url limited to 100 cards per page. images also found and appended as children to the list elements.
var cardsByPage = function(allCards){
  var ul = document.querySelector("#card_list");
  ul.innerHTML = "";
  var cards = allCards.cards;
  console.log(cards.length);
  cards.forEach(function(card){
    var li = document.createElement("li")
    li.innerText = card.name;
    li.value = card
    ul.appendChild(li);
  })
}

var cardImage = function(allCards){
  var body = document.querySelector("body");
  var cards = allCards.cards;
  console.log(cards.length);
    var image = document.createElement("img")
    image.src = cards[0].imageUrl;
    body.appendChild(image);
}


var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  allCards = JSON.parse(jsonString);
  cardsByPage(allCards);
  cardImage(allCards);
  location.reload;
}

var butttonTest = function(){
  console.log("the clicked worked");
}

// reloads the page with the endpoint changed, increments clicks variable and adds it to new url link to be requested 
var nextPageButton = function(){
  console.log(clicks)
  clicks += 1;
  var url = "https://api.magicthegathering.io/v1/cards?page=" + (clicks);
  console.log(url);
  makeRequest(url, requestComplete);
}

// reloads the page with the endpoint changed, if at first page it hits catch and exits
var backPageButton = function(){
  console.log(clicks)
  if (clicks <= 1 ){
    return;
  } else {
    clicks -= 1
    var url = "https://api.magicthegathering.io/v1/cards?page="+ (clicks);
    console.log(url);
    makeRequest(url, requestComplete);
  }
}

// var onListClick = function(){
//   var ul = document.getElementById("card_list");
//   var image = document.querySelector("image")
//   ul.addEventListener("click",  function changeImage(card) {
// image.src = this.imageUrl;
//   },
//  false);


// }

var app = function(){
  var url = "https://api.magicthegathering.io/v1/cards?page=1";
  var nextPage = document.querySelector("#nextPage");
  var clickTest = document.querySelector("#clickTest");
  var backPage = document.querySelector("#backPage");
  makeRequest(url, requestComplete);
  var list = document.querySelector("ul")

  nextPage.onclick = nextPageButton;
  backPage.onclick = backPageButton;
  clickTest.onclick = butttonTest;
  // list.onclick = onListClick;
  

}

window.onload = app;