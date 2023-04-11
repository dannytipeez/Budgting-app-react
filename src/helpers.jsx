//fetch data from local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}


const generateRandomColor = () => {
    const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetsLength * 34} 65% 50%`
}


//create budget
export const createBudget = (
    { name, amount }
) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }

    const existingBudgets = fetchData("budgets") ?? []
    return localStorage.setItem('budgets', JSON.stringify([...existingBudgets, newItem]))
}


//create expense 
export const createExpense = (
    { name, amount, budgetId }
) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? []

    return localStorage.setItem('expenses', JSON.stringify([...existingExpenses, newItem]))
}

//format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: 'currency',
        currency: 'KES'
    })
}


//calculate spent expenses
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const totalExpense = expenses.reduce((acc, expense) => {
        //if expense.budgetId === budgetId calcuate expense
        if (budgetId != expense.budgetId) return acc
        //add expenses
        return acc + expense.amount
    }, 0)
    return totalExpense;
}

//format percentage
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: 'percent',
        minimumFractionDigits: 2,
    })
}

//format date

export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

//get all items from local storage
export const getAllMatchingPairs = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value);
}


//delete expense
export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key) ?? [];
    if (id) {
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}