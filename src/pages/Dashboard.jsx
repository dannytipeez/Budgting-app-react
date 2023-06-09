//react-router and react
import React from 'react'
import { Link, json, redirect, useLoaderData } from 'react-router-dom';

//helpers
import { createBudget, createExpense, deleteItem, fetchData } from '../helpers';

//components
import Intro from '../Components/Intro';
import AddNewBudget from '../Components/AddNewBudget';
import AddExpenseForm from '../Components/AddExpenseForm';
import BudgetItem from '../Components/BudgetItem';

//toastify
import { toast } from 'react-toastify';
import Table from '../Components/Table';

//loader
export function dashboardLoader() {
  const userName = fetchData('userName');
  const budgets = fetchData('budgets');
  const expenses = fetchData('expenses');
  return { userName, budgets, expenses };
}


//action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  //new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.")
    }
  }

  if (_action === "createBudget") {
    try {
      //create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount
      })
      return toast.success("Budget created successfully!")
    } catch (e) {
      throw new Error("There was a problem creating your budget.")
    }
  }
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

//dashboard
const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div>
          <h1>Welcome back, <span className='accent'>{userName}</span></h1>
          <br />
          <div className='grid-sm'>
            {
              budgets && budgets.length > 0
                ?
                (
                  <div className='grid-lg'>
                    <div className='flex-lg'>
                      <AddNewBudget />
                      <AddExpenseForm budgets={budgets} />
                    </div>
                    <h2>Existing Budgets</h2>
                    <div className='budgets'>
                      {
                        budgets.map((budget) => (
                          <BudgetItem budget={budget} key={budget.id} />
                        ))
                      }
                    </div>
                    {
                      expenses && expenses.length > 0 &&
                      (
                        <div className='grid-md'>
                          <h2>Existing Expenses</h2>
                          <Table expenses={
                            expenses.sort(
                              (a, b) => b.createdAt - a.createdAt)
                              .slice(0, 8)
                              } />
                              {
                                expenses.length > 8 && (
                                  <Link to="expenses" className='btn btn--dark'>View all expenses</Link>
                                )
                              }
                        </div>
                      )
                    }

                  </div>
                )
                :
                (
                  <div className='grid-sm'>
                    <p>Personal budgeting is the secret to financial success</p>
                    <p>Create a budget to get started!</p>
                    <AddNewBudget />
                  </div>
                )
            }
          </div>
        </div>
      ) : (<Intro />)}
    </>
  )
}


export default Dashboard;
