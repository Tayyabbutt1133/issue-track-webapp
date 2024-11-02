"use client";

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import bug_logo from '../../assets/bug-report.png'
import { lexendDeca } from '../ui/fonts'
import { usePathname } from 'next/navigation'
import classNames from 'classnames';

const Navbar = () => {

  const currentpath = usePathname();
  console.log(currentpath);

  const links = [
    {
      label: "Dashboard",
      Link: '/'
    },
    {
      label: "Issues",
      Link: '/issues'
    }
  ]



  return (
    <nav className='flex space-x-16 border-b mb-5 px-5 h-20 items-center'>
      <Link className={`flex items-center`} href="/">
      <Image src={bug_logo} height={40} width={40} alt='logo'/>
      </Link>
      <ul className={`flex space-x-4 ${lexendDeca.className}`}>

        {links.map(link =>
          <Link key={link.Link}
            className={
              
              classNames({
              'text-zinc-900': link.Link === currentpath,
              'text-zinc-500': link.Link !== currentpath,
              'hover:text-zinc-800 transition-colors': true
              })
            
            }
            href={link.Link}>{link.label}
          </Link>
        
        )}
      </ul>
    </nav>
  )
}

export default Navbar