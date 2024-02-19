import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin.jsx';

export default function Layin({userData ,setuserData}) {
  let navigate = useNavigate();

  function logOut(){
    localStorage.removeItem('token');
    setuserData(null);
    navigate('/login');
  }
  return (
    <>
    
        <div>
            <NavbarAdmin logOut={logOut} userData={userData}/>
            <div className="">
              <Outlet/>
            </div>
            {/* <Footer/> */}
        </div>
    </>
  )
}
