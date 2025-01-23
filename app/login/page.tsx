'use client'
import React from 'react'
import { useState, useEffect } from 'react';


const LoginPage = () => {
    const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
    }

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful!');
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
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage