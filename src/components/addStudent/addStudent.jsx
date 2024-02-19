import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

export default function AddStudent() {


  const [flag, setflag] = useState(false)
  return <>
   <Helmet>
    <meta charSet="utf-8" />
    <title>Admin</title>
    <meta name="description"
content="Bus-System"
/>
</Helmet>

<div className="admin bg-secondary vh-100 position-relative p-3  ">.

<div className="container  d-flex flex-column justify-content-between h-75 mt-3  ">
<div className="user d-flex  justify-content-center">
{/* <i className="fa-solid  fa-user m-2 fa-2x"></i> */}
<h2 className='a h1 Link'>Add Student</h2>
</div>
<div className="row">
  <div className="col-6">

  <label className='Link ' htmlFor="name"> Name</label>
<input   type="text" className='form-control my-2 bg-transparent' name='name' id='name' />


<label className='Link ' htmlFor=" email"> E-mail</label>
<input  type="email" className='form-control my-2 bg-transparent' name='email' id=' email' />


<label className='Link ' htmlFor="national_id"> national_id</label>
<input  type="number" className='form-control my-2 bg-transparent ' name='national_id' id='national_id' />



<label className='Link ' htmlFor="date_birth">date_birth :</label>
    <input className='form-control my-2 bg-transparent' type="date" name = "date_birth" id='date_birth' />


  </div>
  <div className="col-6 ">

  <label className='Link  ' htmlFor="grade_id">grade_id :</label>
<input  className='form-control my-2 bg-transparent' type="number" name = "grade_id" id='grade_id' />


<label className='Link ' htmlFor="classroom_id">classroom_id :</label>
<input  className='form-control my-2 bg-transparent' type="number" name = "classroom_id" id='classroom_id' />

<label className='Link ' htmlFor="section_id">section_id :</label>
<input  className='form-control my-2 bg-transparent' type="number" name = "section_id" id='section_id' />

<label className='Link ' htmlFor="user_id">user_id :</label>
<input  className='form-control my-2 bg-transparent' type="number" name = "user_id" id='user_id' />

  </div>
</div>




<button   type='submit' className='btn btn-info w-25 p-2 mt-4 d-block mx-auto '>{flag==true? <i className='fas fa-spinner fa-spin'></i>:'Add'}</button>


</div>

</div>
  
  
  </>
   
  
}
