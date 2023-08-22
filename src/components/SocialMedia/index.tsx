import React, { ReactElement } from 'react'
import SVGIcon from '../SVGIcon'
import { ISocialMedia } from './types'

const SocialMedia = ({ src, link ,color,hoverColor}: ISocialMedia): ReactElement => {
    return (
        <a target='_blank' href={link}>
            <SVGIcon hoverColor={hoverColor} regularColor={color} path={src} />
        </a>

    )
}

export default SocialMedia