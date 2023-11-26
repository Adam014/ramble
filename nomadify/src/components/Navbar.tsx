"use client";

import Link from "next/link";
import Image from "next/image";
import GitHubButton from 'react-github-btn'

const Navbar = () => {
  return (
    <div>
        <Link href="/" className="flex gap-2 flex-center p-10">
            <Image src="./assets/images/nomadify.svg" alt="nomadify-logo" width={200} height={200} className="object-contain relative z-50" />
        </Link>
        <div className="fixed bottom-0 right-0 p-5">
          <GitHubButton href="https://github.com/Adam014/Nomadify" data-size="large" data-show-count="true">Star this project on Github</GitHubButton>
        </div>
    </div>
  )
}

export default Navbar
