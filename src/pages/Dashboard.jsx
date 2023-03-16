import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { fetchData } from '../helpers';

//loader
export function dashboardLoader() {
    const userName = fetchData('userName');
    return {userName};
}

//dashboard
const Dashboard = () => {
    const { userName } = useLoaderData();
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

export default Dashboard
