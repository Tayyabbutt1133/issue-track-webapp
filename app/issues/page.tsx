"use client"

import React from 'react'
import {Button} from '@radix-ui/themes'
import Link from 'next/link'
import { lexendDeca } from '../ui/fonts'

const page = () => {
  return (
    <div className={`${lexendDeca.className}`}><Button><Link href="/issues/new">New Issue</Link></Button></div>
  )
}

export default page