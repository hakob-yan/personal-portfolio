import React from 'react'
import { Link } from 'react-router-dom'
import * as path from '../../constants/routerPaths'

const NavBar = () => {
    return (
        <header className='text-white bg-opacity-0  fixed w-full text-lg uppercase'>
            <nav className='flex justify-end gap-12 p-12'>
                <Link to={path.HOME}>Home</Link>
                <Link to={path.HOME}>About</Link>
                <Link to={path.HOME}>Services</Link>
                <Link to={path.HOME}>Portfolio</Link>
                <Link to={path.HOME}>Contact</Link>
            </nav>
        </header>
    )
}

export default NavBar