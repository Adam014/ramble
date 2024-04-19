"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="nav">
      <div className="flex gap-2 flex-center justify-between p-10">
        <Link href="/">
          <Image
            src="/assets/images/nomadify.png"
            alt="nomadify-logo"
            width={100}
            height={100}
            className="object-contain relative z-50 nomadify-logo"
          />
        </Link>
        <div className="hamburger" onClick={toggleMenu}>
          <input type="checkbox" checked={isOpen} readOnly />
          <svg viewBox="0 0 32 32">
            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </div>
      </div>
      <div className={`navbar-links ${isOpen && 'active'}`}>
        <ul>
          <li>
            <Link href="/" onClick={closeMenu}>HOME</Link>
          </li>
          <li>
            <Link href="/map" onClick={closeMenu}>MAP</Link>
          </li>
          <li>
            <Link href="/explore" onClick={closeMenu}>EXPLORE</Link>
          </li>
          <li>
            <Link href="/contact" onClick={closeMenu}>CONTACT</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;