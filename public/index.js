var allCards = null;
var clicks = 1

var cardsByPage = function(allCards, page, pageNum){
  var ul = document.querySelector("#card_list");
  ul.innerHTML = "";
  var cards = allCards.cards;
  console.log(cards.length);
  cards.forEach(function(card){
    var li = document.createElement("li")
    var img = document.createElement("img")
    li.innerText = card.name;
    img.src = card.imageUrl;
    ul.appendChild(li);
    li.appendChild(img);
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
  location.reload;
}

var butttonTest = function(){
  console.log("the clicked worked");
}

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

var nextPageButton = function(){
  console.log(clicks)
  clicks += 1;
  var url = "https://api.magicthegathering.io/v1/cards?page=" + (clicks);
  console.log(url);
  makeRequest(url, requestComplete);
}

var onListHover = function(){
  var image = document.getElementsByTagName("li").firstChild.nodeValue;
  image.setAttribute("style", "display: block");
}

var onListOut = function(){
  var image = document.getElementsByTagName("img");
  image.setAttribute("style", "display: none");
}

var app = function(){
  var url = "https://api.magicthegathering.io/v1/cards?page=1";
  var nextPage = document.querySelector("#nextPage");
  var clickTest = document.querySelector("#clickTest");
  var backPage = document.querySelector("#backPage");
  makeRequest(url, requestComplete);
  var list = document.getElementsByTagName("li");
  nextPage.onclick = nextPageButton;
  backPage.onclick = backPageButton;
  clickTest.onclick = butttonTest;
  
  list.onmouseover = onListHover;
  list.onmouseout = onListOut;
  

}

window.onload = app;