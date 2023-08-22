import { ISVGIcon } from "./types"
import React, { ReactElement, MouseEvent } from 'react';

const SVGIcon = ({ width = '50px', height = '50px', viewBox = '0 0 50 50', path, hoverColor, regularColor }: ISVGIcon): ReactElement => {
    const iconStyles = {
        fill: regularColor,
    };

    const handleMouseEnter = (event: MouseEvent<SVGElement>) => {
        event.currentTarget.style.fill = hoverColor;
    };

    const handleMouseLeave = (event: MouseEvent<SVGElement>) => {
        event.currentTarget.style.fill = regularColor;
    };

    return (
        <svg
            className='rounded-full border-solid border-2 border-primary-2 p-2 hover:bg-primary-2 
            transition ease-linear duration-200'
            width={width}
            height={height}
            viewBox={viewBox}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={iconStyles}
        >
            <path d={path} />
        </svg>
    );
};

export default SVGIcon;
