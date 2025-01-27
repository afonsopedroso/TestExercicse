"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("isAuth") === "true") {
      redirect("/welcome");
    }
  }, []);

  const validatePassword = (value:string) => {
  if (value.length > 0 && value.length <= 6) {
      setPasswordError("Password must be more than 6 characters.");
    } else {
      setPasswordError(""); // Clear the error if the condition is met
    }
  }
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        sessionStorage.setItem("isAuth", "true");
        sessionStorage.setItem("username", email);
        router.replace("/welcome");
      } else {
        alert(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleReplace = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    event.preventDefault();
    router.replace(path);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin}>
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
            }`}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <span>
          New User?{" "}
          <a
            className="underline text-blue-500"
            href="/register"
            onClick={(e) => handleReplace(e, "/register")}
          >
            Register
          </a>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
