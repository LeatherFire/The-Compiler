import React from 'react';
import Logo from '../ui/Logo';
import { FaUserAlt,FaSearch } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";


const Header = () => {
  return (
    <div className='menubarheader h-[5.5rem] flex justify-between fixed w-full z-10'>
    <div className='bg-secondary mx-auto container text-white flex justify-between items-center h-full'>
    <div> <Logo /> </div>
      <nav className='flex justify-between'>
        <ul className='flex justify-between gap-2'>
        <li className='p-3 flex justify-between uppercase'>
          <button className="middle none center rounded-lg bg-gray-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-white/20 transition-all hover:shadow-lg hover:shadow-white/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true" href="">Home</button>
        </li>
        <li className='p-3 flex justify-between uppercase'>
        <button className="middle none center rounded-lg bg-gray-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-white/20 transition-all hover:shadow-lg hover:shadow-white/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true" href="">Menu</button>
        </li>
        <li className='p-3 flex justify-between uppercase'>
        <button className="middle none center rounded-lg bg-gray-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-white/20 transition-all hover:shadow-lg hover:shadow-white/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true" href="">About</button>
        </li>
        <li className='p-3 flex justify-between uppercase'>
        <button className="middle none center rounded-lg bg-gray-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-white/20 transition-all hover:shadow-lg hover:shadow-white/40  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true" href="">Book Table</button>
        </li>
        </ul>
      </nav>
      <div className='flex gap-4 items-center'>
        <a href=''>
        <FaUserAlt />
        </a>
        <a href=''>
        <FaBasketShopping />
        </a>
        <a href=''>
        <FaSearch />
        </a>
        <a>
          <button className='btn-primary'>
          Order Online
          </button>
        </a>
      </div>
    </div>
    </div>
  )
}

export default Header
