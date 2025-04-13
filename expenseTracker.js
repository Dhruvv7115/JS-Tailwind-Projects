document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expense-form');
  const expenseNameInput = document.getElementById('expense-name');
  const expenseAmountInput = document.getElementById('expense-amount');
  const expenseList = document.getElementById('expense-list');
  const totalAmountDisplay = document.getElementById('total-amount');
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let totalAmount = calculateTotal();
  renderExpenses();

  expenseForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());
    if(name !== '' && !isNaN(amount) && amount > 0){
      const newExpense = {
        id: Date.now(),
        name, 
        amount
      }

      expenses.push(newExpense);
      saveExpenseToLocal();
      updateTotal();
      renderExpenses();
      //clear values
      expenseAmountInput.value = '';
      expenseNameInput.value = '';
    }
  });

  expenseList.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
      const deleteId = parseInt(e.target.getAttribute('data-id'));
      // console.log(deleteId)
      removeExpense(deleteId);
    }
  })

  function saveExpenseToLocal(){
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  function calculateTotal(){
    return expenses.reduce((sum, expense) => (sum + expense.amount),
    0);
  }

  function updateTotal(){
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  function renderExpenses(){
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
      const expenseLi = document.createElement('li');
      expenseLi.innerHTML = `
      ${expense.name}  -  $${expense.amount}
      <button data-id="${expense.id}" class="bg-[#ffd814] text-gray-950 text-xl px-[12px] py-[8px] rounded-[24px] cursor-pointer transition-all hover:bg-amber-400">Delete</button>`;
      expenseList.appendChild(expenseLi);
    })
  }

  function removeExpense(expenseId){
    expenses = expenses.filter(expense => expense.id !== expenseId);
    saveExpenseToLocal();
    renderExpenses();
    updateTotal();
  }
});