import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as path from '../../constants/routerPaths'
const checkScrollPos = (e: any) => {
    console.log(window.scrollY);

}

const NavBar = () => {
    const ref = useRef(null)
    useEffect(() => {
        window.addEventListener('scroll', checkScrollPos);
        // return window.removeEventListener('scroll', checkScrollPos)
    }, [])
    return (
        <header ref={ref} className='text-font-color bg-opacity-0 position: fixed
        top-0 m-y-5 z-50 w-full text-2xl   '>
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