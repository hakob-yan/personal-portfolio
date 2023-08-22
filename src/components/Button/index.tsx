import React, { ReactElement } from 'react'
import { IButton } from './types'

const Button = ({ text }: IButton): ReactElement => {
    return (
        <button className='text-xl text font-semibold border-2 border-primary-2 rounded-lg bg-primary-2 px-6 py-3 hover:bg-transparent hover:text-primary-2 transition-colors ease-linear duration-200'>
            {text}
        </button>
    )
}

export default Button