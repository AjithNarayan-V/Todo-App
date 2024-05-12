import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-around bg-sky-800  text-white py-2'>
            <div className='font-bold text-xl cursor-pointer'>Todo Manager</div>
            <ul className='flex gap-6 mx-6'>
                <li className='cursor-pointer transition-all hover:font-bold'>Home</li>
                <li className='cursor-pointer transition-all hover:font-bold'>Your Task</li>
                <li className='cursor-pointer transition-all hover:font-bold'>More</li>
            </ul>
        </nav>
    )
} 

export default Navbar