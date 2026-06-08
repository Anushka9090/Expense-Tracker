const form=document.getElementById("expense-form");
const titleInput=document.getElementById("title");
const amountInput=document.getElementById("amount");
const categoryInput=document.getElementById("category");
const expenseList=document.getElementById("expense-list");
const totalEl=document.getElementById("total");
const filter=document.getElementById("filter");

let expenses= JSON.parse(localStorage.getItem("expenses")) || [];
let total=0;
window.addEventListener("DOMContentLoaded", loadExpenses);

function loadExpenses(){
    expenseList.innerHTML="";
    total=0;
    expenses.forEach(exp=>{
        addExpenseToDOM(exp);
        total+=exp.amount;
    });
    totalEl.innerText=total;
}
form.addEventListener("submit",function(e){
    e.preventDefault();
    const title=titleInput.value.trim();
    const amount= Number(amountInput.value);
    const category= categoryInput.value;
    if(title === "" || amount <=0 || category === ""){
        alert("Please fill all fields correctly");
        return;
    }
    const expense = {
    id: Date.now(),
    title,
    amount,
    category
  };

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  addExpenseToDOM(expense);

  total += amount;
  totalEl.innerText = total;

  form.reset();
});

function addExpenseToDOM(expense){
    const tr=document.createElement("tr");
    tr.innerHTML=`
    <td>${expense.title}</td>
    <td>₹${expense.amount}</td>
    <td>${expense.category}</td>
    <td><button class="delete">X</button></td>
    `;

    tr.querySelector(".delete").addEventListener("click",function(){
        expenseList.removeChild(tr);
        total -= expense.amount;
        totalEl.innerText=total;
        expenses = expenses.filter(e => e.id !== expense.id);
        localStorage.setItem("expenses", JSON.stringify(expenses));
    });
    expenseList.appendChild(tr);
}