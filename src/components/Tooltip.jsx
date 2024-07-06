import * as React from 'react'
import classNames from 'classnames'

export default function Tooltip({ children, position = 'bottom', title }) {

    const tooltipClasses = classNames({
        'bottom-full left-1/2 z-20 mb-3': position.includes('top'),
        'left-1/2 top-full z-20 mt-3': position.includes('bottom'),
        'right-full top-1/2 z-20 mr-3': position.includes('left'),
        'left-full top-1/2 z-20 ml-3': position.includes('right'),
    });
    
    return (
        <div className="group relative w-full h-full flex flex-col items-center justify-center transition-all ease-in-out">
            {children}
            <div className={`${tooltipClasses} absolute -translate-x-1/2 transition-all duration-200 whitespace-nowrap rounded bg-black px-4 py-[6px] text-sm font-semibold text-white scale-0 group-hover:scale-100 invisible group-hover:visible`}>
                {title}
            </div>
        </div>
    )
}
