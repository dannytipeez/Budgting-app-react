import React from 'react'
import { json, redirect, useLoaderData } from 'react-router-dom';
import { fetchData } from '../helpers';
import Intro from '../Components/Intro';

//loader
export function dashboardLoader() {
    const userName = fetchData('userName');
    return {userName};
}

//action
export async function dashboardAction({request}) {
  const data = await request.formData();
  // console.log({data, request})
  const userData = Object.fromEntries(data)
  try {
    localStorage.setItem("userName", JSON.stringify(userData.userName));
    redirect("/")
    return toast.success(`Welcome ${userDAta.userName}`)
  }catch(e){
    throw new Error("There was a problem creating your account.")
  }
}

//dashboard
const Dashboard = () => {
    const { userName } = useLoaderData();
  return (
    <>
      {userName ? (<p>{userName}</p>) : (<Intro />)}
    </>
  )
}

export default Dashboard
