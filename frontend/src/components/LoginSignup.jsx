import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';




export default function LoginSignup() {
// HOOK SECTION >>>
    const [isLoginMode, setIsLoginMode] = useState(true);
    const navigate  = useNavigate();
    
    const [formData, setFromData] = useState({
        email: '',
        password: ''
    });

    
    // LOGICAL SECTION >>>
    function ToggleEvent() {
        setIsLoginMode(!isLoginMode);
    }

    function updateForms(event) {
        setFromData((prev) => {
            return ({
                ...prev,
                [event.target.name]: event.target.value,
            })
        })
    }

    async function submitHandler(event) {
        event.preventDefault();

        const endPoint = isLoginMode ? "/api/v1/login/student" : "/api/v1/signup/student";

        try {
            const url = `http://localhost:3000${endPoint}`
            // console.log(url);
            const response = await axios.post(url, formData);
            
            if(response) {
                if(!isLoginMode) {
                    alert("User Signup Successfully");
                }
                else {
                    alert("User Login Successfully");
                    navigate('/home');
                }
            }
            else {
                alert(response.data.message);
            }
        }
        catch(err) {
            alert("Error Occured");
            console.log(err.message);
        }
    }

    // UI SECTION >>>
  return (
    <div className='w-[100vw] h-[100vh] bg-[#333] text-white flex justify-center items-center flex-col gap-4' >
       <h1 className='text-[3rem] font-medium underline text-red-400'>
            {
                isLoginMode ? "Login" : "Signup"
            }
        </h1>

        <form onSubmit={submitHandler} method='POST' className='container p-5 shadow-md shadow-white rounded-md border' >
            <div className='flex flex-col gap-1 mb-3'>
                <label htmlFor="email" className='font-semibold'>Email</label>
                <input 
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Enter Email Address'
                    value={formData.email}
                    onChange={updateForms}
                    className='border rounded-md p-1 text-black'
                />
            </div>
            <div className='flex flex-col gap-1'>
            <label htmlFor="password" className='font-semibold'>Password</label>
                <input 
                    type='text'
                    name='password'
                    id='password'
                    placeholder='Enter Passsword'
                    value={formData.password}
                    onChange={updateForms}
                    className='border rounded-md p-1 text-black'
                />
            </div>

            <button type='submit' className=''>
                {
                    isLoginMode ? "Login" : "Signup"
                }
            </button>
        </form>

        <div>
            <button onClick={ToggleEvent}>
                {
                    isLoginMode? "Switch to Signup" : "Switch to Login"
                }
            </button>
        </div>
    </div>
  )
}
