const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummy_transactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
];

let transactions = dummy_transactions;

//add transaction to DOM list

function addTransaction(transaction) {
  //get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  //create element
  const item = document.createElement("li");

  //add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn">X</button>
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

function init() {
  list.innerHTML = "";

  //runs the addTransaction function on every transaction
  transactions.forEach((transaction) => addTransaction(transaction));
  updateValues();
}

init();
