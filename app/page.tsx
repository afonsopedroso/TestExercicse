"use client"
import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
interface User{
  id: number
  first_name: string
  email:string
  avatar:string
}
export default function Home() {
 const router = useRouter();
  useEffect(() => {
    const session = sessionStorage.getItem("isAuth");
    console.log("SESSION", session)
    if (!session) {
      router.replace("/login");
    }
  }, [router]);
  useEffect(() => {
    console.log("SESSION", 1)
    if (!sessionStorage.getItem('isAuth')) {
      router.replace('/register'); // Redirect to Register page
    }else {
      console.log("lala", 1)
          router.replace("/welcome")

    }
  }, [sessionStorage.getItem('isAuth'), router]);

  // Render only if logged in
  if (!sessionStorage.getItem('isAuth')) {
    return null; // Prevent rendering while redirecting
  }
  
  return (
    <div >
      Hello {sessionStorage.getItem("userName")}

    </div>
  );
}