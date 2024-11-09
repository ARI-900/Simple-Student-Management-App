import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export default function AddStudent(props) {

    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        grade: "",
        email: "",
        password: "",
    });

    function ChangeHandler(e) {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }

    async function SubmitHandler(e) {
        e.preventDefault();
        
        try {
            const url = `http://localhost:3000/api/v1/create/student`
            const response = await axios.post(url, formData);
            
            if(response.status === 200) {
                navigate('/home');
            }
            else {
                alert("Failed to add student");
                console.log(response.data);
            }
        }
        catch(err) {
            console.error("Error adding student");
            console.log(err.message);
        }
    }


  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">ADD STUDENT</h2>
    <form action="#" method="post" class="space-y-4">
      
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your name"
        value={formData.name}
        onChange={ChangeHandler}
               class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      
      <div>
        <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
        <input type="number" id="age" name="age" placeholder="Enter your age"
        value={formData.age}
        onChange={ChangeHandler}
               class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      
      <div>
        <label for="grade" class="block text-sm font-medium text-gray-700">Grade</label>
        <input type="text" id="grade" name="grade" placeholder="Enter your grade"
          value={formData.grade}
          onChange={ChangeHandler}
               class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email"
         value={formData.email}
         onChange={ChangeHandler}
               class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password"
        value={formData.password}
        onChange={ChangeHandler}
               class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      
      <button type="submit" class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={SubmitHandler}
      >
        Submit
      </button>
    </form>
  </div>
</div>
  )
}
