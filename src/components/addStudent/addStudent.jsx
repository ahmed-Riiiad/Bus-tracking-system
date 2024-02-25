import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';

export default function AddStudent() {

  let navigate = useNavigate();
  const [flag, setFlag] = useState(false)
  const [emailError, setEmailError] = useState('');
  const [GradeError, setGradeError] = useState('');
  const [nameError, setNameError] = useState('');
  const [ClassNameError, setClassNameError] = useState('');
  const [UserIdError, setUserIdError] = useState('');
  const [SectionError, setSectionError] = useState('');
  const [NationalError, setNationalError] = useState('');
  const [DateError, setDateError] = useState('');
  const [User, setUser] = useState({
    name:"",
    email:"",
    national_id:"",
    date_birth : "",
    grade_id : "",
    classroom_id : "",
    section_id : "",
    user_id : ""

  });

  function takeInputFromUser (e) {
    let userCopy = {...User};
    userCopy[e.target.name] = e.target.value;
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(userCopy);

    setUser(userCopy);
  }

  // async function sendDataToApi() {
  //   let {data} =  await axios.post('http://localhost:8000/api/register' ,User);
  //   console.log(data);
  // }
async function getUserList() {
let header = {
  headers:{
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token   
  }
}
    return await axios.post('http://localhost:8000/api/students' ,User,header)
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
      localStorage.setItem('userListData' ,userListData.data);
      
      navigate('/admin/ShowStudent')
    }
    else
    {
      setFlag(false);
      console.log(userListData);
      setNameError(userListData.data.error.message.name);
      setEmailError(userListData.data.error.message.email);
      setGradeError(userListData.data.error.message.grade_id);
      setClassNameError(userListData.data.error.message.classroom_id);
      setSectionError(userListData.data.error.message.section_id);
      setNationalError(userListData.data.error.message.national_id);
      setDateError(userListData.data.error.message.date_birth);
      setUserIdError(userListData.data.error.message.user_id);
    }
    }
    
  }

  return <>
   <Helmet>
    <meta charSet="utf-8" />
    <title>Admin</title>
    <meta name="description"
content="Bus-System"
/>
</Helmet>

<div className="admin bg-secondary  position-relative pb-5  ">.

<div className="container  d-flex flex-column justify-content-between h-75 mt-5">
<div className="user d-flex  justify-content-center">
{/* <i className="fa-solid  fa-user m-2 fa-2x"></i> */}
<h2 className=' h1 '>Add Student</h2>
</div>
<div className="row">
  <div className="col-6">

  <label className='h5 ' htmlFor="name"> Name</label>
<input  onChange={takeInputFromUser}  type="text" className='form-control my-2 bg-transparent' name='name' id='name' />
{nameError ?<div className='alert alert-danger w-100 mx-auto text-center '>{nameError }</div> :''}


<label className='h5 ' htmlFor=" email"> E-mail</label>
<input  onChange={takeInputFromUser} type="email" className='form-control my-2 bg-transparent' name='email' id=' email' />
{emailError ?<div className='alert alert-danger w-100 mx-auto text-center '>{emailError }</div> :''}


<label className='h5 ' htmlFor="national_id"> national_id</label>
<input  onChange={takeInputFromUser} type="number" className='form-control my-2 bg-transparent ' name='national_id' id='national_id' />
{NationalError ?<div className='alert alert-danger w-100 mx-auto text-center '>{NationalError }</div> :''}



<label className=' h5' htmlFor="date_birth">date_birth :</label>
    <input onChange={takeInputFromUser} className='form-control my-2 bg-transparent' type="date" name = "date_birth" id='date_birth' />
    {DateError ?<div className='alert alert-danger w-100 mx-auto text-center '>{DateError }</div> :''}


  </div>
  <div className="col-6 d-flex flex-column justify-content-around mt-3 ">

  {/* <label className='Link' htmlFor="grade_id">Grade :</label>
<input  onChange={takeInputFromUser} className='form-control my-2 bg-transparent' type="text" name = "grade_id" id='grade_id' /> */}

<div className ="input-group m-3 bg-transparent ">
  <label className ="input-group-text text-bg-danger pe-5" htmlFor=" grade_id">Grade </label>
  <select onChange={takeInputFromUser} name='grade_id' className ="form-select bg-transparent" id="grade_id">
    <option selected>Choose...</option>
    <option value="1">Primary Grade</option>
    <option value="2">Secondary Grade</option>
    <option value="3">preparatory Grade</option>
  </select>
</div>
{GradeError ?<div className='alert alert-danger w-100 mx-auto text-center hh '>{GradeError }</div> :''}


{/* <label className='Link ' htmlFor="classroom_id">Classroom :</label>
<input  onChange={takeInputFromUser} className='form-control my-2 bg-transparent' type="number" name = "classroom_id" id='classroom_id' /> */}

<div className="input-group m-3">
  <label className="input-group-text text-bg-danger pe-4" htmlFor=" classroom_id">classroom</label>
  <select onChange={takeInputFromUser} name='classroom_id' className="form-select bg-transparent" id=" classroom_id">
    <option selected>Choose...</option>
    <option value="1">First Class</option>
    <option value="2">Second Class</option>
    <option value="3">Third Class</option>
    <option value="4">Fourth Class</option>
    <option value="5">Fifth Class</option>
    <option value="6">Sixth Class</option>
  </select>
</div>
{ClassNameError ?<div className='alert alert-danger w-100 mx-auto text-center '>{ClassNameError }</div> :''}

{/* <label className='Link ' htmlFor="section_id">Section_id :</label>
<input  onChange={takeInputFromUser} className='form-control my-2 bg-transparent' type="text" name = "section_id" id='section_id' /> */}

<div className="input-group m-3">
  <label className="input-group-text text-bg-danger pe-5" htmlFor="section_id">Section</label>
  <select onChange={takeInputFromUser} name='section_id' className="form-select  bg-transparent" id="section_id">
    <option selected>Choose...</option>
    <option value="1">A</option>
    <option value="2">B</option>
    <option value="3">C</option>
  </select>
</div>
{SectionError ?<div className='alert alert-danger w-100 mx-auto text-center '>{SectionError }</div> :''}

<label className='Link ms-2 h5 text-dark ' htmlFor="user_id">user_id :</label>
<input  onChange={takeInputFromUser} className='form-control m-2 bg-transparent' type="number" name = "user_id" id='user_id' />
{UserIdError ?<div className='alert alert-danger w-100 mx-auto text-center '>{UserIdError }</div> :''}

  </div>
</div>




<button  onClick={handelSubmit}  type='submit' className='btn btn-danger w-25 p-2 mt-5 d-block mx-auto '>{flag==true? <i className='fas fa-spinner fa-spin'></i>:'Add'}</button>


</div>

</div>
  
  
  </>
   
  
}
