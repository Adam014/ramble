"use client";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="nav">
        <div className="flex gap-2 flex-center p-10">
            <Link href="/"> 
              <Image src="/assets/images/nomadify.png" alt="nomadify-logo" width={100} height={100} className="object-contain relative z-50 nomadify-logo" />
            </Link>
        </div>
    </div>
  )
}

export default Navbar;
