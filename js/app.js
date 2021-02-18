'use strict';

let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');
let prodIndexArray = [];
let numSelector = 6;

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


function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProduct() {


  while (prodIndexArray.length < numSelector) {
    let rand = getRandomIndex();
    while (!prodIndexArray.includes(rand)) {
      prodIndexArray.unshift(rand);
    }
  }
  // console.log(prodIndexArray);
  let firstIndex = prodIndexArray.pop();
  let secondIndex = prodIndexArray.pop();
  let thirdIndex = prodIndexArray.pop();

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



function handleClick(event) {
  let productClicked = event.target.title;

  if (event.target === myContainer) {
    alert('Click image');
  }

  totalClicks++;

  for (let i = 0; i < allProducts.length; i++) {
    if (productClicked === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }

  renderProduct();

  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    renderProdChart();
  }
  renderProdChart();
}

renderProduct();

function renderProdChart() {
  let productNames = [];
  let productViews = [];
  let productVotes = [];

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productVotes.push(allProducts[i].votes);
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }]
    },
    {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 0.2)',
        ],
        borderWidth: 1
      }]
    },
    options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
}



myContainer.addEventListener('click', handleClick);
