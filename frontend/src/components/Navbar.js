import {Link} from 'react-router-dom'
import { useState } from 'react'
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import {useSelector} from 'react-redux'




const Navbar = () => {
  
const {amount}=useSelector((store)=>store.cart)
    const [nav, setNav] = useState(false);
    const handleNav = () => setNav(!nav);
    return (
      <div className='w-screen h=[80px] z-10 bg-zinc-200 fixed drop-shadow-lg'>
        <div className='px-2 flex justify-between items-center w-full h-full'>
          <div className='flex items-center justify-between mx-[20px] px-4'>
            <h2 className='flex items-center font-bold mr-2 sm:text-3xl'>
              Oel Farm
            </h2>
            <ul className='hidden md:flex '>
              <li className='px-2'>
                <Link to='home' smooth={true} offset={50} duration={500}>
                  Home
                </Link>
              </li>
              <li className='px-2'>
                <Link to='about' smooth={true} offset={50} duration={500}>
                  About
                </Link>
              </li>
              <li className='px-2'>
                <Link to='support' smooth={true} offset={50} duration={500}>
                  Support
                </Link>
              </li>
              
            </ul>
          </div>
  

           
          <div className='hidden md:flex pr-6'>
              

              <div className='relative py-4 px-8'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
             

              <div className='absolute text-bold w-5 h-5 rounded-full bg-blue-300 top-2 left-11 flex items-center text-center'>
                 <p className='text-white font-bold px-1 flex justify-between items-center text-center py-[-1px] mx-[auto] '>{amount}</p>
              </div>

              </div>

                   

             <button className='border-none bg-transparent text-black mr-6'>
              Sign In
            </button>
            <button className='px-5 py-2'>Sign up</button>
          </div>
  
          {/*hamburger*/}
          <div className='md:hidden mr-4 bg:text-slate-600' onClick={handleNav}>
            {!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}
          </div>
        </div>
  
        <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
          <li className='border-b-2 border-zinc-300 w-full'>Home</li>
          <li className='border-b-2 border-zinc-300 w-full'> About</li>
          <li className='border-b-2 border-zinc-300 w-full'>support</li>
         
          <div className='flex flex-col my-4'>
            <link>

            </link>
            <button className='bg-transparent text-indigo-600 px-8  py-3 mb-4'>
              sign in
            </button>
            <button className='px-8 py-3'>sign up</button>
          </div>
        </ul>
      
      </div>
    );
  };

export default Navbar;