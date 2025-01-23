"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';



const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypepassword, setRetypePassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (!username || !password) {
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
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Register successful!');
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
      </form>
    </div>
  )
}

export default RegisterPage

