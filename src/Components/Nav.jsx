import React from 'react'
import { Form, NavLink } from 'react-router-dom'

//assets
import logomark from '../assets/logomark.svg';

//delete icon
import { TrashIcon } from '@heroicons/react/24/solid'

function Nav({ user }) {
    return (
        <nav>
            <NavLink to="/" aria-label="Go to Home">
                <img src={logomark} alt="logo" height={30} />
                <span>HomeBudget</span>
            </NavLink>
            {
                user && (
                    <Form method='post' action='/logout' onSubmit={(event) => {
                        if (!confirm("Delete data and user!")) {
                            event.preventDefault();
                        }
                    }}>
                        <button type="submit" className='btn btn--warning'>
                            <span>Delete User</span>
                            <TrashIcon width={20} />
                            
                        </button>
                    </Form>
                )
            }
        </nav>
    )
}

export default Nav
