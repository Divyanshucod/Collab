import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex min-h-screen items-center justify-center '>
      <Link href='/documents/171' className='text-blue-400 space-x-2'>Click here to go to a document page</Link>
    </div>
  )
}
