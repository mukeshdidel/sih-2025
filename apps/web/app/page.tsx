import React from 'react';
import Leaf from './icons/Leaf';
import UserIcon from './icons/UserIcon';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* header */}
      <header className="border-b border-gray-800 h-20">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 text-green-400">
              <Leaf />
              <span className="text-xl font-light text-white">App Name</span>
            </div>
            <div className="text-green-400 hover:text-green-300 cursor-pointer">
              <UserIcon />
            </div>
          </div>
        </div>
      </header>

      {/* main */}
      <div className="py-32 flex-1">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight">
            {/*Ancient Wisdom,*/} Some Quote
            <br />
            <span className="text-green-400">{/*Modern Precision*/} Some Other Quote</span>
          </h1>
          <p className="text-xl text-gray-400 my-12 font-light leading-relaxed max-w-2xl mx-auto">
            Create intelligent Ayurvedic diet charts that honor traditional principles 
            while delivering modern accuracy and precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-500 text-gray-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-green-400 transition-colors">
              Get Started Free
            </button>
            <button className="border border-green-500 text-green-400 px-8 py-4 rounded-full text-lg font-medium hover:bg-green-500 hover:text-gray-900 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
      {/* footer */}
      <footer className="py-8 border-t h-20 border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 text-green-400">
              <Leaf  />
              <span className="text-sm font-light text-gray-400">App Name</span>
            </div>
            <p className="text-gray-500 text-sm">© 2025 App Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;