import { CurrencyDollarIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useRef } from 'react'
import { Form, useFetcher } from 'react-router-dom'

function AddNewBudget() {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();

  //fetcher functionalities
  const isSubmitting = fetcher.state === 'submitting'

  useEffect(() => {
    if(!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting])

  return (
    <div className='form-wrapper'>
       <h2 className='h3'>
        Create budget
       </h2>
       <fetcher.Form method='post' className='grid-sm' ref={formRef}>
        <div className='grid-xs'>
          <label htmlFor='newBudget'>Budget Name</label>
          <input type='text' name='newBudget' id='newBudget' placeholder='e.g, Groceries' required ref={focusRef} />
        </div>
        <div className='grid-xs'>
          <label htmlFor='newBudgetAmount'>Budget Amount</label>
          <input type='number' step="0.01" name='newBudgetAmount' id='newBudgetAmount' placeholder='e.g, $1000' inputMode='decimal' required />
        </div>
        <input type='hidden' name="_action" value="createBudget" />
        {
        !isSubmitting ? 
        (
        <button type='submit' className='btn btn-dark'>
        <span>
          Create Budget
        </span>
        <CurrencyDollarIcon width={20} />
      </button>
  ) : (
    <button type='submit' className='btn btn-dark'>
          <span>
            Submitting...
          </span>
        </button>
  )
      }
        
       </fetcher.Form>
    </div>
  )
}

export default AddNewBudget