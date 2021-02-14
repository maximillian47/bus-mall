'use strict';

let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('usb', 'gif');
new Product('water-can');
new Product('wine-glass');


function getRandomIndex(){
  return Math.floor(Math.random() * allProducts.length);
}

function renderProduct(){
  let indexArray = [];

  while (indexArray.length < 3) {
    let rand = getRandomIndex();
    while (!indexArray.includes(rand)){
      indexArray.push(rand);
    }
  }

  let firstIndex = indexArray.pop();
  let secondIndex = indexArray.pop();
  let thirdIndex = indexArray.pop();

  imageOne.src = allProducts[firstIndex].src;
  imageOne.title = allProducts[firstIndex].name;
  allProducts[firstIndex].views++;

  imageTwo.src = allProducts[secondIndex].src;
  imageTwo.title = allProducts[secondIndex].name;
  allProducts[secondIndex].views++;

  imageThree.src = allProducts[thirdIndex].src;
  imageThree.title = allProducts[thirdIndex].name;
  allProducts[thirdIndex].views++;
}

function renderResults(){
  let myList = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++){
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes, and was seen ${allProducts[i].views} times`;
    myList.appendChild(li);
  }
}

function handleClick(event){
  let productClicked = event.target.title;

  if (event.target === myContainer) {
    alert('Click image');
  }

  totalClicks++;

  for (let i = 0; i < allProducts.length; i++){
    if(productClicked === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }

  renderProduct();
  
  if (totalClicks === clicksAllowed){
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleButtonClick(event){ 
  if(totalClicks === clicksAllowed){
    renderResults();
  }
}

renderProduct();

myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);