const generateID = () => `general${Math.round(Math.random() * 1e8).toString(16)}`


const totalBalance = document.querySelector('.total__balance'),
    totalMoneyIncome = document.querySelector('.total__money-income'),
    totalMoneyExpenses = document.querySelector('.total__money-expenses'),
    historyList = document.querySelector('.history__list'),
    form = document.getElementById('form'),
    operationName = document.querySelector('.operation__name'),
    operationAmount = document.querySelector('.operation__amount');

let dataBaseOperation = JSON.parse(localStorage.getItem('calc')) || []; //история расходов


const renderOperation = operation => {
  const className = operation.amount < 0 ? 
  'history__item-minus' :
  'history__item-plus';
  const listItem = document.createElement('li');
  listItem.classList.add('history__item');
  listItem.classList.add(className);
  listItem.innerHTML = `${operation.description}
  <span class="history__money">${operation.amount} ₽</span>
  <button class="history_delete" data-id='${operation.id}'>x</button>`;

  historyList.append(listItem);
};

const updateBalance = () => {
  const resultIncome = dataBaseOperation
    .filter((item) => item.amount > 0)
    .reduce((result, item) => result + item.amount, 0);

  const resultExpenses = dataBaseOperation
    .filter((item) => item.amount < 0)
    .reduce((result, item) => result + item.amount, 0);

  totalMoneyIncome.textContent = resultIncome + ' ₽';
  totalMoneyExpenses.textContent = resultExpenses + ' ₽';
  totalBalance.textContent = (resultIncome + resultExpenses) + ' ₽'; 
}; //обновление баланса

const addOperation = (event) => {
  event.preventDefault();
  
  const operationNameValue = operationName.value,
        operationAmountValue = operationAmount.value;
  
        operationName.style.borderColor = ''; 
        operationAmount.style.borderColor = '';
  if (operationNameValue && operationAmountValue) {
    const operation = {
      id: generateID(),
      description: operationNameValue,
      amount: +operationAmountValue, //правильное суммирование и вычитание баланса при добавлении новой операции
    }; 

    dataBaseOperation.push(operation);
    init();
    console.log(dataBaseOperation);

  } else {
      if(!operationNameValue) operationName.style.borderColor = 'red'; //окрашивание формы в красный цвет при добавлении операции
      if(!operationAmountValue) operationAmount.style.borderColor = 'red';
  }
   
  operationName.value = '';
  operationAmount.value = '';
}; //добавление новой операции


const deleteOperation = (event) => {
  const target = event.target;
  if (event.target.classList.contains('history_delete')) {
    dataBaseOperation = dataBaseOperation
    .filter(operation => operation.id !== target.dataset.id);
    
    init();
  }

}; //удаление операции


const init = () => {
  historyList.textContent = '';
  dataBaseOperation.forEach(renderOperation);
  updateBalance();
  localStorage.setItem('calc', JSON.stringify(dataBaseOperation));
}; //суммирование баланса 

form.addEventListener('submit', addOperation); //добавление операции при нажатии на кнопку
historyList.addEventListener('click', deleteOperation); //удаление операции при клике на крестик

init();










