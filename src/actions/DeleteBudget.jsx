import React from 'react'
import { toast } from 'react-toastify';
import { deleteItem, getAllMatchingPairs } from '../helpers';
import { redirect } from 'react-router-dom';

function DeleteBudget({ params }) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id
        });
        const associatedExpenses = getAllMatchingPairs({
            category: "expenses",
            key: "budgetId",
            value: params.id
        });
        associatedExpenses.forEach((expense) => {
            deleteItem({
                category: "expenses",
                id: expense.id
            })
        });
        toast.success("Budget deleted successfully");
    } catch (e) {
        throw new Error("There was a problem deleting your budget");
    }
    return redirect("/")
}


export default DeleteBudget
