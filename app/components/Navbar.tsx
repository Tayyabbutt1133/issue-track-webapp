import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import bug_logo from '../../assets/bug-report.png'
import { lexendDeca } from '../ui/fonts'

const Navbar = () => {


  const links = [
    {
      label: "Dashboard",
      href: '/'
    },
    {
      label: "Issues",
      href: '/'
    }
  ]



  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-20 items-center'>
      <Link className={`flex items-center ${lexendDeca.className}`} href="/">
      <Image src={bug_logo} height={40} width={40} alt='logo'/>
      </Link>
      <ul className='flex space-x-4'>

        {links.map(link =>
          

          <Link key={link.href} className={`${lexendDeca.className} text-zinc-400 hover:text-black transition duration-300`} href={link.href}>{link.label}</Link>
        
        )}

        

        {/* <li><Link className={`${lexendDeca.className} text-zinc-400 hover:text-black transition duration-300`} href="/">Dashboard</Link></li>
        <li><Link className={`${lexendDeca.className} text-zinc-400 hover:text-black duration-300`} href="/">Issue's</Link></li> */}
      </ul>
    </nav>
  )
}

export default Navbar