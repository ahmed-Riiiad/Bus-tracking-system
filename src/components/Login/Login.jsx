import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { Helmet } from "react-helmet";

export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [Flag, setFlag] = useState(false);
  const [User, setUser] = useState({
    email: "",
    password: ""
  });

  function takeInputFromUser(e) {
    let userCopy = { ...User };
    userCopy[e.target.name] = e.target.value;
    setUser(userCopy);
  }

  async function getUserList() {
    return await axios
      .post("http://localhost:8000/api/login", User)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          const errorEmail = error.response.data.error.message;
        const errorPassword = error.response.data.error.message
        setEmailError(errorEmail);
        setPasswordError(errorPassword);
        }
      });
  }

  function validateUser() {
    const schema = Joi.object({
      // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
    });
    schema.validate(User, { abortEarly: false });
  }

  async function handelSubmit(event) {
    setFlag(true);
    event.preventDefault();
    let validation = validateUser();
    if (validation?.error) {
      setFlag(false);
    } else {
      const userListData = await getUserList();
      //console.log(userListData);
      if (userListData && userListData.success) {
        setFlag(false);
        localStorage.setItem("token", JSON.stringify(userListData.data));
        saveUserData();
        //login
        if (userListData.data.role == 'admin') {
        navigate("/admin");
        } else {
        navigate("/");
        }
      } else {
        setFlag(false);
        setEmailError(userListData.data.error.message);
      }
    }
  }

  return  <>

      <Helmet>
                <meta charSet="utf-8" />
                <title>Sign-In</title>
                <meta name="description"
      content="Bus-System"
    />
            </Helmet>
  
  <div className="login bg-secondary">
   
   <div className="container login-inside p-4 bg-white w-50 position-absolute translate-middle top-50 start-50  ">
   <div className="user d-flex  justify-content-center">
   <i className="fa-solid  fa-user m-2 fa-2x"></i>
   <h2 className='a h1'>Sign-in</h2>
   </div>
   



   <label htmlFor="email">Email :</label>
          <input
            onChange={takeInputFromUser}
            className="form-control bg-transparent m-2 p-2 font-color"
            type="email"
            name="email"
            id="email"
          />

<div>
{emailError ?
       <div className='alert alert-info'>
         
           <li className='list-group list-unstyled' >{emailError}</li>
         
       </div>
      : ''}
</div>



<label htmlFor="password">Password :</label>
          <input
            onChange={takeInputFromUser}
            className="form-control bg-transparent m-2 p-2 font-color"
            type="password"
            name="password"
            id="password"
          />
<div>
{PasswordError ?
       <div className='alert alert-info'>
         
           <li className='list-group list-unstyled' >{PasswordError}</li>
         
       </div>
      : ''}
</div>



<button onClick={handelSubmit} type='submit' className='btn btn-info w-100 p-2 mt-4'>
{Flag == true ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
 </button>
{/* </form> */}
{/* <div className='d-flex justify-content-center mt-3 '>
<h2 className='h4 text-muted'>First Time ?   </h2>
<Link to='/'className='h4 ms-1 oo ' > Register</Link>
</div> */}

   </div>
 
 </div>
    </>
  
}
