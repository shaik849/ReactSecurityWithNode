import React, { useState } from 'react'
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';

const FormsComponent = ({onLogin}) => {
    const [formType, setFormType] = useState('login'); // Default to 'login'
   // Handlers to switch forms
   const showLoginForm = () => setFormType('login');
   const showSignupForm = () => setFormType('signup');
   return (
     <div>
       {/* Navbar */}
       <Navbar formType={formType} loginForm={showLoginForm} signupForm={showSignupForm} />
       {/* Conditional Form Rendering */}
       <div className="container mx-auto mt-6 p-4">
         {formType === 'login' ? <Login onLogin={onLogin} /> : <Signup />}
       </div>
     </div>
   )
}

export default FormsComponent