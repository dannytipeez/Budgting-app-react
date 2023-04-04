import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { fetchData } from '../helpers';
import Table from '../Components/Table';

//loader
export function expensesLoader() {
    const expenses = fetchData('expenses');
    return { expenses };
}

function ExpensesPage() {
    const { expenses } = useLoaderData();

    return (
        <div className='grid-lg'>
            <h2>All Expenses</h2>
            {
                expenses && expenses.length >0 ?
                    (
                        <div className='grid-md'>
                            <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                            <Table expenses={
                                expenses.sort(
                                    (a, b) => b.createdAt - a.createdAt)}
                            />
                        </div>
                    ):
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