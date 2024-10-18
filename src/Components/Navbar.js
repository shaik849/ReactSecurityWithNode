import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({loginForm, signupForm, formType}) => {
  return (
    <nav className="bg-white border-b-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link href="/"> <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    /></Link>
        </div>

        {/* Links */}
        <div className="flex space-x-4">
          {/* Sign Up Button */}
          {
            formType === 'signup' ?   (<button onClick={loginForm} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Login
          </button>)
           :
           (
            <button onClick={signupForm} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign Up
          </button>
           )
          }
    
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
//                                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
