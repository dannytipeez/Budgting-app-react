import React from 'react'
import { json, redirect, useLoaderData } from 'react-router-dom';
import { fetchData } from '../helpers';
import Intro from '../Components/Intro';
import { toast } from 'react-toastify';
import AddNewBudget from '../Components/AddNewBudget';

//loader
export function dashboardLoader() {
  const userName = fetchData('userName');
  const budgets = fetchData('budgets');

  return { userName, budgets };
}

//action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const userData = Object.fromEntries(data)
  try {
    localStorage.setItem("userName", JSON.stringify(userData.userName));
    return toast.success(`Welcome ${userData.userName}`)
  } catch (e) {
    throw new Error("There was a problem creating your account.")
  }
}

//dashboard
const Dashboard = () => {
  const { userName, budgets } = useLoaderData();

  return (
    <>
      {userName ? (
        <div>
          <h1>Welcome back, <span className='accent'>{userName}</span></h1>
          <br />
          <div className='grid-sm'>
            <div className='grid-lg'>
              <div className='flex-lg'>
              <AddNewBudget />
              </div>
            </div>
          </div>
        </div>
      ) : (<Intro />)}
    </>
  )
}

export default Dashboard
