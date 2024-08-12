/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const inputNumber = document.getElementById("inputNumber");
const buttonDraw = document.getElementById("buttonDraw");
const buttonSort = document.getElementById("buttonSort");
const box = document.getElementById("box");

let symbols = ["♥", "♠", "♣", "♦"];
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function random(arr) {
  let randomNum = Math.floor(Math.random() * arr.length);
  return randomNum;
}

function generateCard() {
  const randomSymbol = symbols[random(symbols)];
  const randomNumber = numbers[random(numbers)];

  return [randomSymbol, randomNumber];
}

let list = [];

buttonDraw.addEventListener("click", function() {
  console.log(inputNumber.value);

  if (inputNumber.value !== "") {
    for (let i = 0; i < parseInt(inputNumber.value); i++) {
      let cardRandom = generateCard();
      list.push(cardRandom);

      const isRedSymbol = cardRandom[0] === "♥" || cardRandom[0] === "♦";
      let cardNumber;
      const isAsNumber = cardRandom[1] === 1;

      if (cardRandom[1] === 1) {
        cardNumber = cardRandom[0];
      } else if (cardRandom[1] === 11) {
        cardNumber = "J";
      } else if (cardRandom[1] === 12) {
        cardNumber = "Q";
      } else if (cardRandom[1] === 13) {
        cardNumber = "K";
      } else {
        cardNumber = cardRandom[1];
      }

      let newCard = document.createElement("div");
      newCard.className =
        "card d-flex p-0 m-0 justify-content-start align-items-center";

      newCard.innerHTML = `
        <div class="card-header d-flex justify-content-start align-items-center bg-transparent pt-3 ps-1">
          <h2 class="symbol-header" style="color: ${
            isRedSymbol ? "red" : "black"
          }">${isAsNumber ? "" : cardRandom[0]}</h2>
        </div>
        <div class="card-body d-flex justify-content-center align-items-center">
          <h1 class="number-body" style="color: ${
            isRedSymbol ? "red" : "black"
          }">${cardNumber}</h1>
        </div>
        <div class="card-footer d-flex justify-content-end align-items-center bg-transparent pb-2 pe-1">
          <h2 class="symbol-footer" style="color: ${
            isRedSymbol ? "red" : "black"
          }">${isAsNumber ? "" : cardRandom[0]}</h2>
        </div>
      `;

      box.appendChild(newCard);
    }
  }

  console.log(list);
});

let contador = -1;

buttonSort.addEventListener("click", sorting);

function sorting() {
  const bubbleSort = arr => {
    let wall = arr.length - 1; // Iniciamos el wall o muro al final del array

    while (wall > 0) {
      let index = 0;
      while (index < wall) {
        // Comparar las posiciones adyacentes, si la correcta es más grande, tenemos que intercambiar
        if (arr[index][1] > arr[index + 1][1]) {
          let aux = arr[index];
          arr[index] = arr[index + 1];
          arr[index + 1] = aux;
        }
        index++;
      }
      wall--; // Disminuir la pared para optimizar
      contador++;
      cardsArrays(arr);
    }
    return arr;
  };

  bubbleSort(list);
}

function cardsArrays(arr) {
  const containerP = document.getElementById("containerP");

  let serieContainer = document.createElement("div");
  serieContainer.className = "serie-container";

  let number = document.createElement("div");
  number.className = "numero-serie";
  number.innerHTML = `. ${contador}`;
  serieContainer.appendChild(number);

  let boxCards = document.createElement("div");
  boxCards.className = "boxCards";

  arr.forEach(cardElement => {
    const isRedSymbol = cardElement[0] === "♥" || cardElement[0] === "♦";
    let cardNumberElement;
    const isAsNumber = cardElement[1] === 1;

    if (cardElement[1] === 1) {
      cardNumberElement = cardElement[0];
    } else if (cardElement[1] === 11) {
      cardNumberElement = "J";
    } else if (cardElement[1] === 12) {
      cardNumberElement = "Q";
    } else if (cardElement[1] === 13) {
      cardNumberElement = "K";
    } else {
      cardNumberElement = cardElement[1];
    }

    let newCard = document.createElement("div");
    newCard.className =
      "card d-flex p-0 m-0 justify-content-start align-items-center";

    newCard.innerHTML = `
      <div class="card-header d-flex justify-content-start align-items-center bg-transparent pt-3 ps-1">
        <h2 class="symbol-header" style="color: ${
          isRedSymbol ? "red" : "black"
        }">${isAsNumber ? "" : cardElement[0]}</h2>
      </div>
      <div class="card-body d-flex justify-content-center align-items-center">
        <h1 class="number-body" style="color: ${
          isRedSymbol ? "red" : "black"
        }">${cardNumberElement}</h1>
      </div>
      <div class="card-footer d-flex justify-content-end align-items-center bg-transparent pb-2 pe-1">
        <h2 class="symbol-footer" style="color: ${
          isRedSymbol ? "red" : "black"
        }">${isAsNumber ? "" : cardElement[0]}</h2>
      </div>
    `;

    boxCards.appendChild(newCard);
  });

  serieContainer.appendChild(boxCards);
  containerP.appendChild(serieContainer);
}
