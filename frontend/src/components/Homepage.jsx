import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import AddStudent from './AddStudent';


function Homepage() {

  // HOOK SECTION >>>
  const [user, setUser] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  },[]);
  

  async function fetchData() {
    
    setLoader(true);

    try {
      try {
        const url = 'http://localhost:3000/api/v1/get/student'
        const response = await axios.get(url);

        if(response.status === 200 && response.data) {
          setUser(response.data.data);
        }
        else {
          alert("Failed to fetch data. Server may be down.");
          navigate('/');
        }
        
      } 
      catch (error) {

        console.log(error.message);
      }
    }
    catch(err) {
      console.error(err.message);
      console.log("Server Down");
    }

    setLoader(false);
  }


  function addStudentHandler() {
    navigate('/add-student');
  }

  async function deleteHandler(id) {

    let flag = prompt('Are you sure you want to delete');

    flag = flag.toLowerCase();

    if(flag === 'yes') {
      try {
        const url = `http://localhost:3000/api/v1/delete/student/${id}`
        const response = await axios.delete(url);

        if(response.status === 200 && response.data) {
          alert("Student deleted successfully");
          fetchData();
        }
        else {
          alert("Failed to delete data. Server may be down.");
        }
      }
      catch(err) {
        alert("Server Issues, Not Deleted");
        console.error(err.message);
      }
    }
  }

  function updateHandler(id) {
    
      let flag = prompt('Are you sure you want to update');

      flag = flag.toLowerCase();

      if(flag === 'yes') {
        navigate(`/update-student/${id}`);
      }
      else {
        alert("i am in no");
      }
  }


  return (
    <div className='w-[100%] h-[100%]'>
        
        
        <div className='w-11/12 mx-4'>
          <h1 className='font-bold text-[2rem]'>Student Management Portal</h1>
          <button onClick={addStudentHandler} className='bg-red-500 hover:bg-yellow-400 transition-all duration-300 text-white '>Add Student</button>
        </div>

      <hr className='my-10' />

      <section className='w-full h-full'>

        <table className="border-seperate border-2 container border-slate-500 mx-auto">
          <thead>
            <tr>
              <th className="border border-slate-600 ">ID</th>
              <th className="border border-slate-600 ">Name</th>
              <th className="border border-slate-600 ">Age</th>
              <th className="border border-slate-600 ">Grade</th>
              <th className="border border-slate-600 ">Email</th>
              <th className="border border-slate-600 ">Password</th>
              <th className="border border-slate-600 ">Function</th>
            </tr>
          </thead>
          <tbody>
            {
              user.map((item, index) => {
                return (
                  <tr className='text-center' key={index}>
                  <td className="border border-slate-700 py-2">{item._id.slice(-3)}</td>
                  <td className="border border-slate-700 ">{item.name}</td>
                  <td className="border border-slate-700 ">{item.age}</td>
                  <td className="border border-slate-700 ">{item.grade}</td>
                  <td className="border border-slate-700 ">{item.email}</td>
                  <td className="border border-slate-700 ">******{item.password.slice(-3)}</td>
                  <td className="border border-slate-700 flex justify-center gap-3">
                      <button className='bg-yellow-400 my-0 py-2 hover:bg-yellow-300' onClick={() => updateHandler(item._id)}>Update</button>
                      <button className='bg-red-600 my-0 py-2 hover:bg-red-500' onClick={() => deleteHandler(item._id)}>Delete</button>
                  </td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </section>
        
    </div>
  )
}

export default Homepage