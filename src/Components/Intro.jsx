import React, { useState } from 'react'

//icon
import { UserPlusIcon } from '@heroicons/react/24/solid'

//asset
import illustration from "../assets/illustration.jpg"
import { Form } from 'react-router-dom'

function Intro() {
    // const [userName, setuserName] = useState("")
    // console.log(userName)
    return (
        <div className='intro'>
            <div>
                <h1>Take control of <span className="accent">your money</span> </h1>
                <p>Personal budgeting is the beginning of financial freedom</p>
                <Form method="post">
                    <input
                        type="text"
                        name="userName"
                        placeholder='what is your name?'
                        aria-label='your name'
                        autoComplete='given-name'
                        required
                    />
                    <button type='submit' className='btn btn--dark'>
                        <span>Create Account <UserPlusIcon width={20} /></span>
                    </button>
                </Form>
            </div>
            <img src={illustration} alt="Person with money" width={600} />
        </div>
    )
}

export default Intro
