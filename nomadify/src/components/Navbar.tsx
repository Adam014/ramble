"use client";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="nav">
        <div className="flex gap-2 flex-center p-10">
            <Link href="/"> 
              <Image src="/assets/images/nomadify.svg" alt="nomadify-logo" width={200} height={200} className="object-contain relative z-50" />
            </Link>
        </div>
    </div>
  )
}

export default Navbar;
