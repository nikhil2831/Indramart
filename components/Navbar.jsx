"use client"
import React, { useState } from "react";
import { assets, CartIcon } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {

  const { isSeller, router, userData, logout, getCartCount } = useAppContext();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />

        <button onClick={() => router.push('/cart')} className="relative">
          <CartIcon />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-3 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </button>

        {userData ? (
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
              {userData.name}
            </button>
            <div className="hidden group-hover:block absolute right-0 top-full bg-white shadow-lg rounded-md py-2 min-w-[160px] z-50 border">
              <button onClick={() => router.push('/my-orders')} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">My Orders</button>
              <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-500">Logout</button>
            </div>
          </div>
        ) : (
          <button onClick={() => router.push('/login')} className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            Login
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

        <button onClick={() => router.push('/cart')} className="relative">
          <CartIcon />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-3 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </button>

        {userData ? (
          <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2 hover:text-gray-900 transition relative">
            <Image src={assets.user_icon} alt="user icon" />
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 min-w-[160px] z-50 border">
                <button onClick={() => router.push('/my-orders')} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">My Orders</button>
                <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-500">Logout</button>
              </div>
            )}
          </button>
        ) : (
          <button onClick={() => router.push('/login')} className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;