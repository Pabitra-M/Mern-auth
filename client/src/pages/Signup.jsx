import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();



  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  console.log(formData);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json();
      setLoading(false)
      if(data.success === false){
        setError(true);
        return;
      }

      navigate('/sign-in');

    } catch (err) {
      setLoading(false)
      setError(true)

    }
  }




  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>Sign Up</h1>
      <form onSubmit={handelSubmit} className='flex flex-col gap-3'>
        <input className=' bg-slate-100 p-3 rounded-lg' type="text" placeholder='Username' id='username' name='username' onChange={handelChange} />
        <input className=' bg-slate-100 p-3 rounded-lg' type="email" placeholder='Email' id='email' name='email' onChange={handelChange} />
        <input className=' bg-slate-100 p-3 rounded-lg' type="password" placeholder='Password' id='password' name='password' onChange={handelChange} />


        <button disabled={loading} className=' bg-sky-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : " Sign Up "}</button>
        <OAuth/>      
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an accout?</p>
        <Link to="/sign-in">
          <span className=' text-blue-500'>Sign in </span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{error && "Something went wrong"}</p>

    </div>

  )
}

export default Signup
