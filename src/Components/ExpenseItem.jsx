import React from 'react'
import { formatCurrency, formatDateToLocaleString } from '../helpers'

function ExpenseItem({ expense }) {
  return (
    <>
        <td>{expense.name}</td>
        <td>{formatCurrency(expense.amount)}</td>
        <td>{formatDateToLocaleString(expense.createdAt)}</td>
    </>
  )
}


export default ExpenseItem
