import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ShowStudent() {
  const [ShowStudents, setShowStudents] = useState([]);

  useEffect(() => {
    console.log(ShowStudents);
  }, [ShowStudents]);

  async function getUserList() {
    try {
      let header = {
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token
        }
      };
      let { data } = await axios.get('http://localhost:8000/api/students', header);
      setShowStudents(data.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  }

  // Call getUserList when component mounts
  useEffect(() => {
    getUserList();
  }, []);
      



  return <>
<div className='bg-img'>


{/* <table className='table table-striped  text-white'>
 <thead >
      <th className=' p-2 text-center '>Name</th>
      <th className=' p-2 text-center'>E-mail</th>
      <th className=' p-2 text-center'>national_id</th>
      <th className=' p-2 text-center '>date_birth</th>
      <th className=' p-2 text-center'>grade_id</th>
      <th className=' p-2 text-center'>classroom_id</th>
      <th className=' p-2 text-center'>section_id</th>
      <th className=' p-2 text-center'>user_id</th>
      <th className=' p-2  text-center'> Edit </th>
      <th className=' p-2 text-center'> Delete</th>
    </thead>  
  <tbody >
  { ShowStudents.map((student,index)=><tr>

    <td className=' p-2 text-center '>{student.name}</td>
    <td className=' p-2 text-center'>E-mail</td>
    <td className=' p-2 text-center'>national_id</td>
    <td className=' p-2 text-center '>date_birtd</td>
    <td className=' p-2 text-center'>grade_id</td>
    <td className=' p-2 text-center'>classroom_id</td>
    <td className=' p-2 text-center'>section_id</td>
    <td className=' p-2 text-center'>user_id</td>
    <td className=' p-2  text-center'> Edit </td>
    <td className=' p-2 text-center'> Delete</td>
    </tr>
    )}
  </tbody>
  </table>



<div className=" container vh-100   d-flex justify-content-center align-items-center">
<table className='table  bg-black text-white'>
    <thead >
      <th className=' p-2 text-center '>Name</th>
      <th className=' p-2 text-center'>E-mail</th>
      <th className=' p-2 text-center'>national_id</th>
      <th className=' p-2 text-center '>date_birth</th>
      <th className=' p-2 text-center'>grade_id</th>
      <th className=' p-2 text-center'>classroom_id</th>
      <th className=' p-2 text-center'>section_id</th>
      <th className=' p-2 text-center'>user_id</th>
      <th className=' p-2  text-center'> Edit </th>
      <th className=' p-2 text-center'> Delete</th>
    </thead>
    <tbody className=' text-center bg-secondary '>
      <tr>
        <td>ccc</td>
        <td>ccc</td>
        <td>ccc</td>
        <td>ccc</td>
        <td>ccc</td>
        <td>ccc</td>
        <td>ccc</td>
        <td>ccc</td>
        <td><button className='btn btn-info'> Edit</button></td>
        <td><button className='btn btn-danger'> Delete</button></td>
      </tr>
      <tr>
        <td>ccc</td>
        <td>ccc</td>
        <td>ccc</td>
        <td>ccc</td>
        <td>ccc</td>
        <td>ccc</td>
        <td>ccc</td>
        <td>ccc</td>
        <td><button className='btn btn-info'> Edit</button></td>
        <td><button className='btn btn-danger'> Delete</button></td>
      </tr>
  </tbody>
  </table>

</div>
  */}



 <div class="container-fluid vh-100 d-flex page-body-wrapper full-page-wrapper">
     <div class="row w-100 m-0">
         <div class="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
             <div class=" col-lg-12 mx-auto">
                 <table class="table  table-striped table-dark">
                     <thead>
                         <tr>
                             <th scope="col">Name</th>
                             <th scope="col">E-mail</th>
                             <th scope="col">National_id</th>
                             <th scope="col">Date_birth</th>
                             <th scope="col">Parent</th>
                             <th scope="col">Grade</th>
                             <th scope="col">Classroom</th>
                             <th scope="col">Section</th>
                             <th class="ps-4" scope="col">Edit</th>
                             <th class="ps-4" scope="col">Delete</th>
                         </tr>
                     </thead>
                     <tbody>
                     { ShowStudents.map((student,index)=><tr>
                                 <th scope="row">{student.name}</th>
                                 <td>{student.email}</td>
                                   <td>{student.national_id}</td>
                                 <td>{student.date_birth}</td>
                                 <td>{student.parent}</td>
                                 <td>{student.grade}</td>
                                 <td>{student.classroom}</td>
                                 <td>{student.section}</td>
                                 <td>
                                     <form action="">
                                         <button class="btn btn-primary">Edit</button>
                                     </form>
                                 </td>
                                 <td>
                                     <form action="" method="post" onsubmit="return confirm('Are you sure to delete this product?')">
                                         <button type="submit" class="btn btn-danger">Delete</button>
                                 </form>
                                 </td>
                             </tr>)}
                     </tbody>
                 </table>
             </div>
         </div>
     </div>
 </div>
 </div>


  
  </>

  
}
