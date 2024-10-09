'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (pathname) {
      const pathArray = pathname.split('/').filter((path) => path)
      const crumbs = pathArray.map((path, index) => {
        const href = '/' + pathArray.slice(0, index + 1).join('/')
        return { path, href }
      })
      setBreadcrumbs([{ path: '', href: '/' }, ...crumbs]) // Ensure the first segment is always "/"
    }
  }, [pathname])

  return (
    <div className="nav">
      <div className="flex gap-2 flex-center justify-between p-10 items-center">
        <Link href="/">
          <Image
            src="/assets/images/nomadify.png"
            alt="nomadify-logo"
            width={100}
            height={100}
            className="object-contain relative z-50 nomadify-logo"
          />
        </Link>
        <div className="breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              <Link href={crumb.href} onClick={closeMenu} className="breadcrumb-url-segment">
                {decodeURIComponent(crumb.path)}
              </Link>
              {index < breadcrumbs.length - 1 && ' / '}
            </span>
          ))}
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <input type="checkbox" checked={isOpen} readOnly />
          <svg viewBox="0 0 32 32">
            <path
              className="line line-top-bottom"
              d="M27 10L13 10C10.8 10 9 8.2 9 6C9 3.5 10.8 2 13 2C15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30C23.2 30 25 28.2 25 26C25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path className="line" d="M7 16L27 16"></path>
          </svg>
        </div>
      </div>
      <div className={`navbar-links ${isOpen && 'active'}`}>
        <ul>
          <li>
            <Link href="/" onClick={closeMenu}>
              HOME
            </Link>
          </li>
          <hr />
          <li>
            <Link href="/map" onClick={closeMenu}>
              MAP
            </Link>
          </li>
          <hr />
          <li>
            <Link href="/contact" onClick={closeMenu}>
              ROADTRIPS
            </Link>
          </li>
          <hr />
          <li>
            <Link href="/explore" onClick={closeMenu}>
              EXPLORE
            </Link>
          </li>
          <hr />
          <li>
            <Link href="/contact" onClick={closeMenu}>
              CONTACT
            </Link>
          </li>
          <hr />
          <div className='navbar-footer'>
            Powered by <a href='https://rapidapi.com'>RapidApi</a> | <a href='https://github.com/Adam014/ramble'>Crafted by Adam Stádník c {(new Date()).getFullYear()}</a>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
