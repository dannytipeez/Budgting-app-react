import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { createExpense, deleteItem, getAllMatchingPairs } from '../helpers'
import BudgetItem from '../Components/BudgetItem';
import AddExpenseForm from '../Components/AddExpenseForm';
import { mainLoader } from '../Layouts/Main';
import Table from '../Components/Table';
import { toast } from 'react-toastify';


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
}

function BudgetPage() {
    const { budget, expenses } = useLoaderData();

    return (
        <div className='grid-lg' style={{
            "--accent": budget.color
        }}>
            <h2><span className="accent">{budget.name}</span> Expenses</h2>
            <div className="flex-lg">
                <BudgetItem budget={budget} />
                <AddExpenseForm budgets={[budget]} />
                {
                    expenses && expenses.length > 0 && (
                        <div className="grid-md">
                            <h2><span className='accent'>{budget.name}</span> expenses.</h2>
                            <Table expenses={expenses} showBudget={false} />
                        </div>)
                }

            </div>


        </div>
    )
}

export default BudgetPage
