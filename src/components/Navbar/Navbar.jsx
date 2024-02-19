import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({userData ,logOut}) {
  return   <>

<div className=''>
 


 <div className="nav bg-secondary  container-fluid d-flex justify-content-between ">
   <img width='60' className='ms-3' src='/imgs/school-bus_11174231.png' alt=""/>
   <div className="list  ">
 
   {userData?
       <ul className="list-unstyled text-white ooo  d-flex justify-content-center ">
         <li className='m-2 mt-3 h5'><Link className='Link' to='' >Home</Link></li>
         <li className='m-2  mt-3 h5'><Link  className='Link' to='Sons' >Sons</Link></li>
         <li className='m-2  mt-3 h5'><Link  className='Link' to='Bus_tracking' >Bus_tracking</Link></li>
 
       </ul>
     :''}
     </div>

     <div className="nav-login d-flex  justify-content-center align-items-center ">
     {userData?
     <ul className="list-unstyled d-flex text-white  ">
     <li  className='cursorPointer m-2 mt-3 h5'>
      <Link to='profile'>   
         <img width='35' className='border rounded-circle ' src="/imgs/7400.jpg" alt="" /> 
        </Link>
      </li>
     <li onClick={logOut} className='cursorPointer m-2 mt-3 h5'><span >LogOut</span></li>

     
       </ul>


         :
         
         <ul className="list-unstyled d-flex text-white  ">
         <li  className='cursorPointer m-2 mt-3 h5'><Link  className='Link' to='login' >Login</Link></li>
         <li  className='cursorPointer m-2 mt-3 h5'><Link  className='Link' to='register' >register</Link></li>
         
           </ul>
         
         }
     </div>

   </div>

   </div>
    </>
  
}
