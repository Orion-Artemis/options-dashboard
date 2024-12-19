import React from 'react'
import Navbar from './components/Navbar/Navbar';
import { Button } from './components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className=''>
        <Navbar />
        <div className='flex justify-center items-center flex-col w-full max-h-screen pt-64 gap-4'>
          <div className='text-5xl '>
            WELCOME TO <span className='text-4xl'>OPTIONS</span><span className='text-5xl pl-[2px] font-bold font-akalime'>SIM</span>
          </div>
          <p className='text-lg font-roboto'>
            A platform to simulate options trading strategies for your portfolio.
          </p>
          <Link to={'/auth'}>
            <Button>Get Started</Button>
          </Link>
        </div>
    </div>
  );

export default Home