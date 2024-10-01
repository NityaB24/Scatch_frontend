// Assuming this is your JSX file, named for example Navbar.jsx
import React from 'react';

const Navbar = () => {
    return (
        <header className="w-full fixed top-0 left-0 px-5 py-3 flex justify-between items-center bg-transparent shadow">
            <a className="text-xl w-[80px] object-cover" href="/shop">
                {/* <img src="src/Backend/logo.jpeg" alt="" /> */}
                Scatch
            </a>
            <div className="flex items-center gap-6">
                <a href="/shop" className="flex items-center gap-1">
                    <i className="ri-store-fill"></i>
                    <span></span>
                </a>
                <a href="/cart" className="flex items-center gap-1">
                    <i className="ri-shopping-cart-line text-xl"></i>
                    <span></span>
                </a>
                <a href="/profile" className="flex items-center gap-1">
                    <i className="ri-user-line text-xl"></i>
                    <span></span>
                </a>
            </div>
        </header>
    );
}

export default Navbar;
