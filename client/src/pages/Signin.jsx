import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signinStart, signinSuccess, signinFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

function Signin() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user)

  const dispatch = useDispatch();
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  console.log(formData);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart())
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json();
      if(data.success === false){
        dispatch(signinFailure(data))
        return;
      }
      dispatch(signinSuccess(data))

      navigate('/');

    } catch (err) {
      dispatch(signinFailure(err.message))

    }
  }






  return (
<div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>Sign In</h1>
      <form onSubmit={handelSubmit} className='flex flex-col gap-3'>
        <input className=' bg-slate-100 p-3 rounded-lg' type="email" placeholder='Email' id='email' name='email' onChange={handelChange} />
        <input className=' bg-slate-100 p-3 rounded-lg' type="password" placeholder='Password' id='password' name='password' onChange={handelChange} />


        <button className=' bg-sky-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : " Sign In "}</button>
        <OAuth />
      
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Create a new account</p>
        <Link to="/sign-up">
          <span className=' text-blue-500'>Sign up </span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{error ? error.message || "Something went wrong" : ""}</p>

    </div>
  )
}

export default Signin
