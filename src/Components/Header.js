import React from 'react'
import note from "../assets/note.png"
const Header = () => {
  return (
    <div className='bg-gray-900 flex gap-2 p-3 text-white text-2xl'>
        <h1>Notes</h1>
        <img src={note} className="w-9 "/>
    </div>
  )
}

export default Header