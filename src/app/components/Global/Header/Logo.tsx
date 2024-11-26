import React from 'react'
import Image from 'next/image'
import RaccoLogo from "../../../../../public/assets/logo.png"
import Link from 'next/link'


const Logo = () => {
  return (
    <div>
        <Link href="/">
            <Image src={RaccoLogo} alt="Reccoelec Logo" width={190} height={0} />
        </Link>
    </div>
  )
}

export default Logo