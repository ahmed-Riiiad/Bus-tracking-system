import './App.css';
import {createBrowserRouter ,RouterProvider}  from 'react-router-dom'; 
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import Login from './components/Login/Login.jsx'
import Layout from './components/Layout/Layout.jsx'
import Otp from './components/Otp/Otp.jsx';
import {  useLayoutEffect, useState } from 'react';
import ProtectedRoute from './components/protectedRoute/protectedRoute.jsx';
import Bus_Tracking from './components/Bus_Tracking/Bus_Tracking.jsx';
import Profile from './components/profile/profile.jsx';
import Admin from './components/addStudent/addStudent.jsx';
import ShowStudent from './components/ShowStudent/ShowStudent.jsx';
import Layin from './components/Layin/Layin.jsx';
import AddStudent from './components/addStudent/addStudent.jsx';
import Sons from './components/Sons/Sons.jsx';


function App() {

  useLayoutEffect(() => {
    
    if(localStorage.getItem('token') !== null)
    {
      saveUserData();
    }
  },[])
  
  const [userData, setuserData] = useState(null);
  let routers = createBrowserRouter([
    {path: '/' ,element : <Layout setuserData={setuserData} userData={userData}/> ,children :[
        {index: true ,element: <ProtectedRoute><Home/></ProtectedRoute>},
        {path: 'Sons',element: <ProtectedRoute><Sons/></ProtectedRoute>},
        {path: 'profile',element: <ProtectedRoute><Profile/></ProtectedRoute>},
        {path:'Bus_tracking' ,element: <ProtectedRoute><Bus_Tracking/></ProtectedRoute>},
        {path:'login' ,element:handelLogin()},
        {path: 'register' ,element:<Register/>},
        // {path: 'admin' ,element: <ProtectedRoute><Admin/></ProtectedRoute>},
        {path: 'otp' ,element:<Otp/>},
        {path: '*' ,element:<ProtectedRoute><NotFound/></ProtectedRoute>}
    ]},
    {path: '/admin' ,element : <Layin setuserData={setuserData} userData={userData} /> ,children :[
      {index: true,element:<ProtectedRoute><AddStudent/></ProtectedRoute>},
      {path: 'ShowStudent',element: <ProtectedRoute><ShowStudent/></ProtectedRoute>},


]}]);
  function saveUserData() {
    // let encodedToken = localStorage.getItem('token');
    // let decodedToken = jwtDecode(encodedToken);
    let x =JSON.parse(localStorage.getItem('token'));
    setuserData(x);
    return userData;
  }
 function handelLogin()
 {
    if(!userData)
    {
      return <Login saveUserData ={saveUserData}/>
    }
    else
    {
      return <ProtectedRoute><Home/></ProtectedRoute>
    }
 }

  return (
    <>
        <RouterProvider router={routers}/>
    </>
  );
}

export default App;
