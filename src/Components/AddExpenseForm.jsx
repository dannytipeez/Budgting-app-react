import React, { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'
import { PlusCircleIcon } from '@heroicons/react/24/solid'



function AddExpenseForm({ budgets }) {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();

  //fetcher functionalities
  const isSubmitting = fetcher.state === 'submitting';

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting])

  return (
    <div className='form-wrapper'>
      <h2 className='h3'>Add New {" "}<span className='accent'>
        {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}</span>{" "}
        Expense
      </h2>
      <fetcher.Form
        method='post'
        className='grid-sm'
        ref={formRef}
      >
        <div className='expense-inputs'>
          <div className='grid-xs'>
            <label htmlFor='newExpense'>Expense</label>
            <input type='text' id='newExpense' name='newExpense' placeholder='e.g, coffee' ref={focusRef} required />
          </div>
          <div className='grid-xs'>
            <label htmlFor='newExpenseAmount'>Amount</label>
            <input
              type='number'
              id='newExpenseAmount' name='newExpenseAmount'
              placeholder='e.g, 100.50'
              ref={focusRef}
              step={0.01}
              inputMode='decimal'
              required
            />
          </div>
          <div className='grid-xs' hidden={budgets.length === 1}>
            <select name='newExpenseBudget'
              id='newExpenseBudget'
              required >
              {
                budgets.sort((a, b) => a.createdAt - b.createdAt)
                  .map((budget) => {
                    return (
                      <option key={budget.id} value={budget.id}>{budget.name}</option>
                    )
                  }
                  )
              }
            </select>
          </div>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        {
          !isSubmitting ?
            (
              <button type='submit' className='btn btn-dark'>
                <span>
                  Add Expense
                </span>
                <PlusCircleIcon width={20} />
              </button>
            ) : (
              <button type='submit' className='btn btn-dark'>
                <span>
                  Submitting...
                </span>
              </button>
            )}
      </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm
