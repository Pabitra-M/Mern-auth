import React from 'react'
import { GoogleAuthProvider, signInWithPopup , getAuth } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handelGoogleClick = async () => {

    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const storeduser = result.user;
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: storeduser.displayName,
          email: storeduser.email,
          photo : storeduser.photoURL
        })
      })

      const data = await res.json();
      dispatch(signinSuccess(data)) 

      navigate('/');


    } catch (error) {
      console.log("can't login",error)
      
    }



  }







  return (
    <button type='button' onClick={handelGoogleClick} className=' bg-red-700 rounded-lg uppercase text-white p-3 hover:opacity-95'>continue with google</button>

  )
}

export default OAuth
