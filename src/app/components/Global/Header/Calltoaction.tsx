import Link from 'next/link'
import React from 'react'
import { MdPhone } from 'react-icons/md'
import Drawer from './Mobile/Drawer'

const Calltoaction = () => { 
  return (
    <div className='flex justify-between items-center gap-2'>
        <div className='hidden lg:block'>
          <Link href='tel:0970707070' className='mr-2 py-2 pb-3 pt-3 px-4 rounded-full text-slate-500 hover:bg-[#1523dc] font-medium border-2 hover:border-[#1523dc] hover:text-white'><MdPhone className='inline-block size-5 relative -top-[2px]' /> 0970707070 </Link>
          <Link  href="/raccordement-electrique">
            <button className='py-2 pb-2.5 px-4 rounded-full text-slate-500 hover:bg-[#1523dc] font-medium border-2 hover:border-[#1523dc] hover:text-white'>Commencer ma demande</button>
          </Link>
        </div> 
        <div className='block lg:hidden'>
          <Drawer />
        </div>
    </div>
  )
}

export default Calltoaction