import React, { useState } from 'react'
import { redirect, useLoaderData } from 'react-router-dom'
import { createExpense, deleteItem, formatDateToLocaleString, getAllMatchingPairs } from '../helpers'
import BudgetItem from '../Components/BudgetItem';
import AddExpenseForm from '../Components/AddExpenseForm';
import { mainLoader } from '../Layouts/Main';
import Table from '../Components/Table';
import { toast } from 'react-toastify';
import BarChart from '../Components/BarChart';


export async function budgetLoader({ params }) {
    const budget = await getAllMatchingPairs({
        category: "budgets",
        key: "id",
        value: params.id
    })[0];
    const expenses = await getAllMatchingPairs({
        category: "expenses",
        key: "budgetId",
        value: params.id
    });
    if (!budget) {
        throw new Error("The budget you're trying to find doesn't exist");
    }

    return { budget, expenses }
}

export async function budgetAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    //action
    if (_action === "createExpense") {
        try {
            //create expense
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch (e) {
            throw new Error("There was a problem adding your expense.")
        }
    }
    if (_action === "deleteExpense") {
        try {
            //delete expense
            deleteItem({
                key: "expenses",
                id: values.expenseId
            })
            return toast.success(`Expense deleted!`)
        } catch (e) {
            throw new Error("There was a problem deleting your expense.")
        }
    }
    //delete budget
    if (_action === "deleteBudget") {
        try {
            //delete budget
            deleteItem({
                key: "budgets",
                id: values.budgetId
            });
            redirect("/")
            return toast.success(`Budget deleted!`);
        } catch (e) {
            throw new Error("There was a problem deleting your budget.")
        }
    }
}

function BudgetPage() {
    const { budget, expenses } = useLoaderData();

    //extract time from expenses -> obect create array of time
    var expenseTime = expenses.map((expense) => {
        return formatDateToLocaleString(expenses[0].createdAt)
    })

    //amounts
    var expenseAmount = expenses.map((expense) => {
        return expense.amount
    }
    )
    // Get the computed value of the --accent variable
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent');
    const hslColor = "hsl(" + accentColor + ")";

    const [userData, setUserData] = useState({
        labels: expenseTime,
        datasets: [{
            label: 'Expense Amount',
            data: expenseAmount,
            backgroundColor: hslColor,
        }
        ]
    })

    return (
        <div className='grid-lg' style={{
            "--accent": budget.color
        }}>
            <h2><span className="accent">{budget.name}</span> Expenses</h2>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true} />
                <AddExpenseForm budgets={[budget]} />
                {
                    expenses && expenses.length > 0 && (
                        <div className="grid-md">
                            <h2><span className='accent'>{budget.name}</span> expenses.</h2>
                            <BarChart chartData={userData} />
                            <Table expenses={expenses} showBudget={false} />
                        </div>)
                }

            </div>


        </div>
    )
}

export default BudgetPage
