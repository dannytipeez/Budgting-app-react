import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { fetchData } from '../helpers';
import Intro from '../Components/Intro';

//loader
export function dashboardLoader() {
    const userName = fetchData('userName');
    return {userName};
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
