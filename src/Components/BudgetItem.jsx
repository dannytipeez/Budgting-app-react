import React from 'react'
import { calculateSpentByBudget, formatCurrency } from '../helpers';
import { Form, Link } from 'react-router-dom';
import { BanknotesIcon, TrashIcon } from '@heroicons/react/24/solid';

function BudgetItem({ budget, showDelete = false }) {
  const { id, name, amount, color, } = budget;
  const spent = calculateSpentByBudget(id);
  const remaining = amount - spent;

  return (
    <div className='budget' style={{ "--accent": color }}>
      <div className='progress-text'>
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
      </progress>
      <div className='progress-text'>
        <small>{formatCurrency(spent)}  spent</small>
        <small>{formatCurrency(remaining)}  remaining</small>
      </div>
      {
        showDelete ?
          (
            <div className="flex-sm">
              <Form
                method='post'
                action="delete"
                onSubmit={(event) => {
                  if (!confirm("Are you sure you want to permanently delete budgets?")) {
                    event.preventDefault();
                  }
                }}
              >
                <button type='submit' className="btn">
                  <span>Delete Budget</span><TrashIcon width={20} /></button>
              </Form>
            </div>
          )
          :
          (
            <div className="flex-sm">
              <Link
                to={`/budgets/${id}`}
                className='btn'
              >
                <span>View Details</span>
                <BanknotesIcon width={20} />
              </Link>
            </div>
          )
      }
    </div>
  )
}

export default BudgetItem
