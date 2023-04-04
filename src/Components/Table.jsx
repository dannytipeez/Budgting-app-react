import React from 'react'
import ExpenseItem from './ExpenseItem'

function Table({ expenses }) {
  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            {
                ["Name", "Amount", "Date"].map((i, index)=> (
                    <th key={index}>{i}</th>
                ))
            }
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              {/* <td>{expense.createdAt}</td>
              <td>{expense.name}</td>
              <td>{expense.amount}</td> */}
              <ExpenseItem expense={expense} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table