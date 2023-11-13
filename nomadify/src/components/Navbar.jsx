"use client";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
        <Link href="/" className="flex gap-2 flex-center p-10">
            <Image src="./assets/images/nomadify.svg" alt="nomadify-logo" width={200} height={200} className="object-contain" />
        </Link>
    </div>
  )
}

export default Navbar
