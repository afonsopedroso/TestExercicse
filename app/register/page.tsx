"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuth");
    if (isAuth === "true") {
      router.replace("/welcome"); // Redirect if already authenticated
    }
  }, [router]);


  const validatePassword = (value:string) => {
  if (value.length > 0 && value.length <= 6) {
      setPasswordError("Password must be more than 6 characters.");
    } else {
      setPasswordError(""); // Clear the error if the condition is met
    }
  }
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password !== retypePassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Register successful!");
        sessionStorage.setItem("isAuth", "true");
        sessionStorage.setItem("username", email);
        router.replace("/welcome");
      } else {
        alert(result.error || "Registration failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="email" className="block mb-2">
          <span>Username (Email):</span>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </label>
        <label htmlFor="password" className="block mb-2">
          <span>Password:</span>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value); validatePassword(e.target.value)}}
            required
            className={`w-full px-3 py-2 border rounded ${
              passwordError ? "border-red-500" : ""
            }`}          />
            {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </label>
        <label htmlFor="retypePassword" className="block mb-2">
          <span>Retype Password:</span>
          <input
            id="retypePassword"
            type="password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center">
        <span>
          Already a user?{" "}
          <a
            className="underline text-blue-500"
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              router.replace("/login");
            }}
          >
            Sign In
          </a>{" "}
          instead.
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
