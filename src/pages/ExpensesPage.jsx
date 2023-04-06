import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { deleteItem, fetchData } from '../helpers';
import Table from '../Components/Table';
import { toast } from 'react-toastify';

//loader
export function expensesLoader() {
    const expenses = fetchData('expenses');
    return { expenses };
}

//action
export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
    
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

function ExpensesPage() {
    const { expenses } = useLoaderData();

    return (
        <div className='grid-lg'>
            <h2>All Expenses</h2>
            {
                expenses && expenses.length > 0 ?
                    (
                        <div className='grid-md'>
                            <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                            <Table expenses={
                                expenses.sort(
                                    (a, b) => b.createdAt - a.createdAt)}
                            />
                        </div>
                    ) :
                    (
                        <div className='grid-md'>
                            <p>No expenses to show!</p>
                        </div>
                    )
            }
        </div>
    )
}

export default ExpensesPage;