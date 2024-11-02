"use client"
import React from 'react'
import { TextField } from '@radix-ui/themes'
import { lexendDeca } from '@/app/ui/fonts'
// import { TextArea } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root>
              <TextField.Input className={`${lexendDeca.className}`} placeholder="Title" />
          </TextField.Root>
          <SimpleMDE className={`${lexendDeca.className}`} placeholder='Description' />
          <Button className={`${lexendDeca.className}`}>
              Submit New Issue
          </Button>
    </div>
  )
}

export default NewIssuePage