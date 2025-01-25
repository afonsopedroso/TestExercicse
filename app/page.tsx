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
    if (!sessionStorage.getItem('isAuth')) {
      router.replace('/register'); // Redirect to Register page
    }else 
    router.replace("/welcome")
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