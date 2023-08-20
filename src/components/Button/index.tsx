import React, { ReactElement } from 'react'
import { IButton } from './types'

const Button = ({ text }: IButton): ReactElement => {
    return (
        <button className='text-xl text font-semibold rounded-lg bg-primary-2 px-6 py-3'>
            {text}
        </button>
    )
}

export default Button