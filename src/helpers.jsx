//local storage

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

//delete item

export const deleteItem = ({ key }) => {
    return localStorage.removeItem(key);
}

const generateRandomColor = () => {
    const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetsLength * 34} 65% 50%`
}
//create budget

export const createBudget = (
    {name, amount}
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
    {name, amount, budgetId}
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

//formatting


//format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: 'currency',
        currency: 'KES'
    })
}
