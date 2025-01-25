"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { redirect } from "next/navigation";



const RegisterPage = () => {
    if(sessionStorage.getItem('isAuth') == 'true'){
        redirect("/welcome")
    }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypepassword, setRetypePassword] = useState('');
  const router = useRouter();
    const [username, setUsername] = useState("");

 
  const handleReplace = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    event.preventDefault(); 
    router.replace(path);
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in both username and password.');
      return;
    }

    if(password != retypepassword){
      alert('Passwords must match!');
      return;
    }

 
    try {
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Register successful!');
        sessionStorage.setItem('isAuth', 'true')
        sessionStorage.setItem('username', email)
        router.replace('/welcome'); 

        console.log(result);

      } else {
        alert(result.message || 'Register failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <label>
          <span className="pr-2">Username:</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          <span className="pr-2">Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
           <br />
        <label>
          <span className="pr-2">Retype Password:</span>
          <input
            type="password"
            value={retypepassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
        <div>
        <span>Already a user? <a className='underline text-blue-400' href="/login" onClick={(e) => handleReplace(e, "/login")}>Sign In</a> instead</span>

        </div>
      </form>
    </div>
  )
}

export default RegisterPage

