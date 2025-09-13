"use client";
import Link from 'next/link';
import Leaf from './icons/Leaf';
import UserIcon from './icons/UserIcon';
import Button from '../components/ui/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function App() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-400 text-white flex flex-col">
      {/* header */}
      <header className="border-b border-gray-100 h-20">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 text-green-800">
              <Leaf />
              <span className="text-xl font-light text-gray-800">AyurNutra</span>
            </div>
            <div className="text-green-800 hover:text-green-300 cursor-pointer">
              <UserIcon />
            </div>
          </div>
        </div>
      </header>

      {/* main */}
      <div className="flex-1 flex items-center">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 mb-8 leading-tight">
            Ancient Wisdom,
            <br />
            <span className="text-gray-800">Modern Precision</span>
          </h1>
          <p className="text-xl text-stone-700 my-12 font-light leading-relaxed max-w-2xl mx-auto">
            Create intelligent Ayurvedic diet charts that honor traditional principles 
            while delivering modern accuracy and precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="auth/signup">
              <Button variant="primary" size="md" >Get Started Free</Button>
            </Link>
            <Link href="auth/signin">
              <Button variant="secondary" size="md" >Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
      {/* footer */}
      <footer className="py-8 border-t h-20 border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 text-green-800">
              <Leaf  />
              <span className="text-sm font-light text-gray-400">AyurNutra</span>
            </div>
            <p className="text-gray-500 text-sm">© 2025 AyurNutra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;