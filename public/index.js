var allCards = null;

var nextPageButton = function(){
  var clicks = 0;
  console.log(clicks)
  clicks += 1;
  var url = "https://api.magicthegathering.io/v1/cards?page=" + (0 + click);
  console.log(url);
  makeRequest(url, requestComplete);
}


var cardsByPage = function(allCards, page, pageNum){
  var ul = document.querySelector("#card_list");
  ul.innerHTML = "";
  var cards = allCards.cards;
  console.log(cards.length);
  cards.forEach(function(card){
    var li = document.createElement("li")
    li.innerText = card.name;
    ul.appendChild(li);
  })
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
  }

  var clickTest = function(){
    console.log("the clicked worked");
  }

var app = function(){
  var url = "https://api.magicthegathering.io/v1/cards?page=1";
  var nextPageButton = document.querySelector("#nextPage");
  var clickTest = document.querySelector("#clickTest");
  makeRequest(url, requestComplete);
  nextPageButton.onclick = nextPageButton;
  clickTest.onclick = clickTest;

}

window.onload = app;