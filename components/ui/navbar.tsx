import React from 'react'
import { ModeToggle } from './night-mode-toggler'

const Navbar = () => {
  return (
    <div className='px-6 py-4 flex justify-around'>
        <h1>Codedamn</h1>
        <ModeToggle />
    </div>
  )
}

export default Navbar