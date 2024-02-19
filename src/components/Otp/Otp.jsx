import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Otp() {
    const [otpInfo, setOtpInfo] = useState({
        otp: 0,
        user_id : 0
    });
    const [Flag, setFlag] = useState(false);
    const [error, setError] = useState('');
    const [countFlag, setCountFlag] = useState(false);
    let navigate = useNavigate();

    async function verifyOtp () {
        return await axios.post('http://localhost:8000/api/verify_otp' ,otpInfo)
        .then(response => response.data)
        .catch(error => {
        if (error.response) {
            const Error = Object.values(error.response.data.error.message).flat();
        setError(Error)
            console.log(error.response);
        }
        });
    }
    async function resendOtp () {
        return  await axios.post('http://localhost:8000/api/resend_otp' ,{email : localStorage.getItem('email')})
        .then(response => response.data)
        .catch(error => {
        if (error.response) {
            console.log(error.response);
        }
        });
    }

    

    function takeInputFromUser(e) {
        let otpInfoCopy = {...otpInfo};
        otpInfoCopy[e.target.name] = e.target.value;
        let id = localStorage.getItem('id');
        otpInfoCopy.user_id = id;
        setOtpInfo(otpInfoCopy);
    }

    async function handelSubmit() {
        if(!countFlag)
            setFlag(true);
        let response = await verifyOtp();
        
        if(response && response.success)
        {
            setFlag(false);
            localStorage.removeItem('id');
            localStorage.removeItem('email');
            navigate('/');
        }
        else
        {
            setFlag(false);
            setCountFlag(true);
            
        }   
    }

  return <>
        {/* <div className='w-50 m-auto mt-5 border border-1 rounded p-5'>
                <div className='text-center'> 
                <h3 className='mb-5'>Otb verification</h3>
                </div>
                <label htmlFor="otp">Otp Message:</label>
            <input onChange={takeInputFromUser} className='form-control bg-transparent m-2 p-2 font-color' type="number" name = "otp" id='otp' />
            <button onClick={handelSubmit} className='btn btn-info m-2 mb-5'>{Flag==true? <i className='fas fa-spinner fa-spin'></i>:'Submit'}</button>
            {countFlag?<button onClick={resendOtp} className='btn btn-info m-2 mb-5 '>'Resend'</button> : ''}
        </div> */}





        <div className=" bg-secondary vh-100">
    <div className="otp container p-4 bg-white w-50 position-absolute translate-middle top-50 start-50">
        <p>Thanks for signing up! Before getting started, 
    could you verify your email address by clicking on the link we just emailed to you ? <br></br>
     If you didn't receive the email, we will gladly send you another.
        </p>
        {/* <p className='hidden-otp d-none '>
            A new verification link has been sent to the email address you provided during registration.
         </p> */}

         <label htmlFor=" code"> Verification Code</label>
        <input onChange={takeInputFromUser}   type="text" className='form-control my-2' name='otp' id=' code' />
        <div>
 {error.length > 0 && (
          <div className='alert alert-info'>
              <li className='list-group list-unstyled' >{error}</li>
          </div>
        )}
 </div>

        
        <div className="resend d-flex justify-content-between">
            <span  className='cursorPointer oo h-25 m-1'> 
            <form method='post' onClick={resendOtp}>
        RESEND VERIFICATION EMAIL
            </form>
          
            </span>
            <button onClick={handelSubmit} className='btn btn-info w-25 p-2 mt-4'>
            {Flag==true? <i className='fas fa-spinner fa-spin'></i>:'Submit'}
         </button>
         {countFlag?
         <button onClick={resendOtp} className='btn btn-info w-25 p-2 mt-4 '>
            Resend</button>

          : ''}

        </div>
        {countFlag?
         <p className='hidden-otp mt-2 '>
            A new verification link has been sent to the email address you provided during registration.
         </p> 
         : ''}
    </div>
  </div>



    </>
  
}
/**
data
{
access_token
: 
"1|Z46AIOHPLwlUlgvsXt8OJaLm0qBo2wYI6bptNihIb1665405"
email
: 
"mohamedyossri11@gmail.com"
id
: 
2
name
: 
"mohamed"
[[Prototype]]
: 
Object
success
: 
true */