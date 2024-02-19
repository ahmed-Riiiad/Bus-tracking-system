import React, { useState } from 'react';
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { Helmet } from 'react-helmet';




export default function Register() {

  let navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [Flag, setFlag] = useState(false);
  const [User, setUser] = useState({
    name:"",
    email:"",
    password:"",
    phone : 0,
    password_confirmation : ""

  });

  function takeInputFromUser (e) {
    let userCopy = {...User};
    userCopy[e.target.name] = e.target.value;
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(userCopy);

    setUser(userCopy);
  }

  async function sendDataToApi() {
    let {data} =  await axios.post('http://localhost:8000/api/register' ,User);
    console.log(data);
    // if(data.message ==='success')
    // {
    //   setFlag(false);
    //   //login
    //   navigate('/login')
    // }
    // else
    // {
    //   setFlag(false);
    //   setError(data.message);
    // }
  }
async function getUserList() {
    return await axios.post('http://localhost:8000/api/register' ,User)
      .then(response => response.data)
      .catch(error => {
        if (error.response) {
          // console.log(error.response);
          return error.response;
        }
      });
  }

  function validateUser()
  {
    const schema = Joi.object({
      name : Joi.string().alphanum().min(3).max(30).required(),
      // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      email : Joi.string().email({tlds: { allow: ['com', 'net'] } })
    })
    schema.validate(User ,{abortEarly:false});
  }

  async  function handelSubmit (event) {
    setFlag(true);
    event.preventDefault();
    let validation = validateUser();
    if(validation?.error)
    {
      setFlag(false);
    }
    else
    {
      const userListData = await getUserList();
      //console.log(userListData);
    if(userListData && userListData.success)
    {
      setFlag(false);
      console.log(userListData);
      localStorage.setItem('id' ,userListData.data.id);
      localStorage.setItem('email' ,userListData.data.email);
      
      navigate('/otp')
    }
    else
    {
      setFlag(false);
      console.log(userListData);
      setNameError(userListData.data.error.message.name);
      setEmailError(userListData.data.error.message.email);
      setPasswordError(userListData.data.error.message.password);
      setPhoneError(userListData.data.error.message.phone);
    }
    }
    
  }

  return  <>

      <Helmet>
                <meta charSet="utf-8" />
                <title>Sign-Up</title>
                <meta name="description"
      content="Bus-System"
    />
            </Helmet>
 
    <div className="login bg-secondary h-100 position-relative p-3 ">
   
      <div className="container login-inside p-4 bg-white w-50   ">
      <div className="user d-flex  justify-content-center">
      <i className="fa-solid  fa-user m-2 fa-2x"></i>
      <h2 className='a h1'>Sign-up</h2>
      </div>
      
      {/* <form > */}
  <label htmlFor="name"> Name</label>
  <input  onChange={takeInputFromUser} type="text" className='form-control my-2' name='name' id='name' />
  {nameError ?<div className='alert alert-danger w-100 mx-auto text-center '>{nameError }</div> :''}


  <label htmlFor=" email"> E-mail</label>
  <input onChange={takeInputFromUser} type="email" className='form-control my-2' name='email' id=' email' />
  {emailError ?<div className='alert alert-danger w-100 mx-auto text-center '>{emailError }</div> :''}


  
  <label htmlFor="phone"> Phone-Number</label>
  <input  onChange={takeInputFromUser} type="number" className='form-control my-2' name='phone' id='phone' />
  {phoneError ?<div className='alert alert-danger w-100 mx-auto text-center '>{phoneError }</div> :''}


  
  <label htmlFor="password">Password :</label>
                <input onChange={takeInputFromUser} className='form-control bg-transparent m-2 mb-1 p-1 font-color' type="password" name = "password" id='password' />
                {passwordError ?<div className='alert alert-danger w-100 mx-auto text-center'>{passwordError}</div> :''}
              <label htmlFor="password_confirmation">Password Confirmition :</label>
                <input onChange={takeInputFromUser} className='form-control bg-transparent m-2 mb-1 p-1 font-color' type="password" name = "password_confirmation" id='password_confirmation' />
                {passwordError ?<div className='alert alert-danger w-100 mx-auto text-center'>{passwordError}</div> :''}

 
 <button  onClick={handelSubmit} type='submit' className='btn btn-info w-100 p-2 mt-4 '>{Flag==true? <i className='fas fa-spinner fa-spin'></i>:'Submit'}</button>
  
  
    {/* <div>{userId}</div> */}
  {/* </form> */}
  {/* <div className='d-flex justify-content-center '>
  <h2 className='h4 text-muted'>already have an account ?   </h2>
  <Link to='/login'className='h4 ms-1 oo ' > login</Link>
  </div> */}
  
      </div>
    
    </div>







    </>
  
}




