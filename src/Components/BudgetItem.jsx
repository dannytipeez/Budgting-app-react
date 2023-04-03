import React from 'react'
import { calculateSpentByBudget, formatCurrency } from '../helpers';

function BudgetItem({ budget }) {
    const {id, name, amount, color,} = budget;
    const spent = calculateSpentByBudget(id);
    const remaining = amount - spent;

    return (
      <div className='budget' style={{"--accent": color}}>
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
      </div>
    )
}

export default BudgetItem
