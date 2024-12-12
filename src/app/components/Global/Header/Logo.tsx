import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const Logo = () => {
  return (
    <div>
        <Link href="/">
            <Image src="/assets/logo2.png" alt="Reccoelec Logo" width={190} height={0} />
        </Link>
    </div>
  )
}

export default Logo