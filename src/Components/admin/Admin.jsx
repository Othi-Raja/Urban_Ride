import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const info = () => {
  toast.info('😿😔Unauthorized email', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      color: 'orange',
      fontWeight: 'bold',
      borderRadius:'30px'
    }
  });
}
const sucess = () => {
  toast.success('LogIn Success🎉', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      color: 'green',
      fontWeight: "bold",
      textAlign: "center",
      borderRadius:'30px'
    }
  });
}
const Admin = () => {
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    const auth = localStorage.getItem('Auth');
    if (auth) {
      setAuthState(true);
    }
  }, []);
  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Successfully signed in
        const user = result.user;
        console.log(result);
        if (user.email === 'othiraja64@gmail.com') {
          sucess()
          setAuthState(true);
          localStorage.setItem('Auth', true);
          window.location.reload()
        } else {
          info();
          // Log out the user
          localStorage.clear();
          auth.signOut();
          // alert('Unauthorized email');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  }
  if (authState) {
    const card = document.querySelector('.card');
    card.classList.add('hidden');
  }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 vw-100' >
      <div className="card text-center p-5" style={{ zIndex: '999' }}>
        <div className="card-body" style={{ zIndex: '999' }}>
          <h1 className='urban-logo pb-4' style={{ color: 'red' }}>Urban Riders</h1>
          <button className="btn btn-block text-white" style={{ backgroundColor: 'rgb(24, 48, 82)' }} onClick={signIn}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" fill='white' height={30} width={30}>
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
            <span className='mx-3'>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Admin;
