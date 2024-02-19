import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout({userData ,setuserData}) {
  let navigate = useNavigate();

  function logOut(){
    localStorage.removeItem('token');
    setuserData(null);
    navigate('/login');
  }
  return (
    <>
    
        <div>
            <Navbar logOut={logOut} userData={userData}/>
            <div className="">
              <Outlet/>
            </div>
            {/* <Footer/> */}
        </div>
    </>
  )
}
