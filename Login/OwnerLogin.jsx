import React from 'react';
import './OwnerLogin.css';
function OwnerLogin({ error }) {
  return (
    <>
    <div className=" font-sans login-box ">
      <form action="/api/owners/login" method="POST">
        <div className="user-box">
          <input type="text" id='email' name="email" required=""/>
          <label htmlFor="email">Email Address</label>
        </div>
        <div className="user-box">
          <input type="password" id='password' name="password" required=""/>
          <label>Password</label>
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <center>
          <button type="submit">
                Sign In
            <span></span>
          </button>
        </center>
      </form>
    </div>
    
    
    </>
  );
}

export default OwnerLogin;
