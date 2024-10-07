import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Signup from './Components/Signup'
import Main from './Components/Main'



const router = createBrowserRouter([
    {
        path : '/',
        element : <Main />,
        // errorElement : <OPPSError />,
        children : [{
            path : '',
            element : <Main />
        },
        {
          path : '/signup',
          element : <Signup />
        },
        // {
        //     path : '/contact',
        //     element : <Contact />
        //   },
        //   {
        //     path : '/user/:id',
        //     element : <User />
        //   },
        //   {
        //     path: '/github',
        //     loader : myLoader,
        //     element : <Github />
        //   }
    ]
    }  
])


const App = () => {
  return (
   <div>
    <RouterProvider router={router} />
   </div>
  )
}

export default App