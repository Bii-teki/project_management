"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "./navbar/navbar";

export default function DashboardLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (!user) {
        router.push('/');
      } else {
        setIsLoading(false);
      }
    }, [router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      );
    }
  
    return (
      <div className="flex min-h-screen py-32 px-32 text-black bg-white bg-gradient-to-br from-base-100 to-base-200">
        {children}
      </div>
    );
}