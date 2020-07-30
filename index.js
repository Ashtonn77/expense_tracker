const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//add new transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

function generateId() {
  return Math.floor(Math.random() * 100000000);
}

//add transaction to DOM list
function addTransactionDOM(transaction) {
  //get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  //create element
  const item = document.createElement("li");

  //add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">X</button>
  `;

  //add newly created element to DOM
  list.appendChild(item);
}

//update income,expenses and totals
function updateValues() {
  //creating an array of the amounts
  const amounts = transactions.map((transaction) => transaction.amount);

  //get total
  const total = amounts.reduce((acc, cur) => acc + cur, 0).toFixed(2);

  //get income values
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

  //get expense values
  const expense = amounts
    .filter((amount) => amount < 0)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

  balance.innerHTML = `$${total}`;
  money_minus.innerHTML = `$${expense}`;
  money_plus.innerHTML = `$${income}`;
}

//remove element
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

//update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
  list.innerHTML = "";

  //runs the addTransactionDOM function on every transaction
  transactions.forEach((transaction) => addTransactionDOM(transaction));
  updateValues();
}

init();

document.querySelector(".btn").addEventListener("click", addTransaction);
