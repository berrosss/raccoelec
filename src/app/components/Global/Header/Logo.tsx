import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const Logo = () => {
  return (
    <div>
        <Link href="/">
            <Image src="/assets/logo2.png" alt="Reccoelec Logo" width={131.364} height={40} />
        </Link>
    </div>
  )
}

export default Logo