import React, { useState } from 'react';
import axios from 'axios';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

const Index = () => {
  const [error, setError] = useState('');

  return (
    <>
      {error && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
          <span className="inline-block mt-1 mb-1 text-white bg-red-500 px-4 py-2 rounded">{error}</span>
        </div>
      )}
      <div className="min-h-screen flex flex-col md:flex-row px-8 md:px-20 mt-8 md:mt-0">
        {/* Left Section - Create Account */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 px-4">
            <h3 className="text-4xl mb-6">
              Welcome to <span className="text-blue-400 font-semibold">Scatch</span>
            </h3>
            <h4 className="text-2xl mb-4">Create your account</h4>
            <form autoComplete="off" action="/api/users/register" method="post" className="mb-6">
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                type="text"
                placeholder="Full Name"
                name="fullname"
              />
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                type="email"
                placeholder="Email"
                name="email"
              />
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                type="password"
                placeholder="Password"
                name="password"
              />
              <input
                className="px-5 rounded-full py-3 mt-2 bg-blue-500 text-white"
                type="submit"
                value="Create My Account"
              />
            </form>
          </div>
        </div>
        {/* Right Section - Login */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 px-4">
            <h4 className="text-2xl capitalize mb-4">Login to your account</h4>
            <form autoComplete="off" action="/api/users/login" method="post">
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                type="email"
                placeholder="Email"
                name="email"
              />
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                type="password"
                placeholder="Password"
                name="password"
              />
              <input
                className="px-5 block rounded-full py-3 mt-2 bg-blue-500 text-white"
                type="submit"
                value="Login"
              />
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default Index;
