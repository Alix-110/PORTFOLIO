let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const transactionForm = document.getElementById("transactionForm");
const transactionsList = document.getElementById("transactionsList");
const totalBalance = document.getElementById("totalBalance");
const totalIncome = document.getElementById("totalIncome");
const totalExpenses = document.getElementById("totalExpenses");

const ctx = document.getElementById('expenseChart').getContext('2d');
let expenseChart;

function updateDashboard() {
  const income = transactions.filter(t => t.type==="income").reduce((acc,t)=>acc+t.amount,0);
  const expense = transactions.filter(t => t.type==="expense").reduce((acc,t)=>acc+t.amount,0);
  totalBalance.innerText = `$${(income-expense).toFixed(2)}`;
  totalIncome.innerText = `$${income.toFixed(2)}`;
  totalExpenses.innerText = `$${expense.toFixed(2)}`;

  // Update transactions list
  transactionsList.innerHTML = "";
  transactions.forEach((t, index)=>{
    const li = document.createElement("li");
    li.classList.add("transaction-item", t.type);
    li.innerHTML = `
      <span>${t.desc} (${t.category})</span>
      <span>$${t.amount.toFixed(2)}</span>
      <button onclick="removeTransaction(${index})">X</button>
    `;
    transactionsList.appendChild(li);
  });

  // Update chart
  const categories = ["food","transport","bills","entertainment","others"];
  const categoryTotals = categories.map(cat=>{
    return transactions.filter(t=>t.type==="expense" && t.category===cat)
                       .reduce((acc,t)=>acc+t.amount,0);
  });

  if(expenseChart) expenseChart.destroy();
  expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        label: 'Expenses',
        data: categoryTotals,
        backgroundColor: ['#ff4444','#ffaa00','#00aaff','#00cc66','#ff00cc'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function removeTransaction(index){
  transactions.splice(index,1);
  updateDashboard();
}

transactionForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  if(!desc || !amount || amount<=0) return;

  transactions.push({desc, amount, type, category});
  transactionForm.reset();
  updateDashboard();
});

updateDashboard();
