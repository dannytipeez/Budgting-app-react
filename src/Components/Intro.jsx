import React, { useState } from 'react'

//icon
import { UserPlusIcon } from '@heroicons/react/24/solid'

//asset
import illustration from "../assets/illustration.jpg"

function Intro() {
    const [userName, setuserName] = useState("")
    console.log(userName)
    return (
        <div className='intro'>
            <div>
                <h1>Take control of <span className="accent">your money</span> </h1>
                <p>Personal budgeting is the beginning of financial freedom</p>
                <form method='post'>
                    <input type="text" name="userName" value={userName} onChange={(e) =>setuserName(e.target.value)} placeholder='what is your name?' autoComplete='given-name' required />
                    <button type='submit'>
                        <span className='btn btn--dark'>Create Account <UserPlusIcon width={20} /></span>
                    </button>
                </form>
            </div>
            <img src={illustration} alt="Person with money" width={600} />
        </div>
    )
}

export default Intro
