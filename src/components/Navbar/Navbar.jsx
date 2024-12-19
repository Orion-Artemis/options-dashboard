import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from '@clerk/clerk-react';


const Navbar = () => {
    const {user, isSignedIn} = useUser()
    return(
        <div className='flex justify-center items-center pt-2'>
            <nav className=' bg-slate-200 w-[95%] flex justify-between h-16 items-center ps-10 pe-10 rounded-lg'>
                <div>
                    <Link to='/' className='flex justify-center items-baseline gap-[2px]'>
                        <span className=' text-xl'>
                            OPTIONS
                        </span>
                        <span className=' text-2xl font-bold font-akalime'>
                            SIM
                        </span>
                    </Link>
                </div>
                <div>
                    {
                        isSignedIn?
                        <div className='flex gap-6'>
                            <Link to={'/dashboard'}>
                                <Button variant='secondary'>Dashboard</Button>
                            </Link>
                            <UserButton />
                        </div>:
                            <Link to={'/auth'}>
                                <Button>Get Started</Button>
                            </Link>
                    }
                </div>
            </nav>
        </div>
    )

};

export default Navbar