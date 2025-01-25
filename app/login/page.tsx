'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { redirect } from "next/navigation";


const LoginPage = () => {
    if(sessionStorage.getItem('isAuth') == 'true'){
        redirect("/welcome")
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [username, setUsername] = useState<string | null>("");

  
  const handleReplace = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    event.preventDefault(); 
    router.replace(path);
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in both username and password.');
      return;
    }

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful!');
        sessionStorage.setItem('isAuth', 'true')
        sessionStorage.setItem('username', email)
        router.replace('/welcome'); 
        console.log(result);
      } else {
        alert(result.message || 'Login failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        <div>New User? <a className='underline text-blue-400' href="/register" onClick={(e) => handleReplace(e, "/register")}>Register</a></div>
      </form>
    </div>
  )
}

export default LoginPage