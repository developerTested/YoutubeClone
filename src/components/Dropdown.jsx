import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs';

export default function Dropdown({ children, title = 'Dropdown', icon, disableRightIcon = false, ...props }) {

    const DropdownClasses = classNames('flex items-center justify-center gap-2  bg-slate-100 dark:bg-white/20 px-4 py-2', {
        'rounded-md': !props.rounded,
        'rounded-full': props.rounded,
    }, props.className)

    return (
        <div className='relative dropdown group'>
            <button className={DropdownClasses}>
                {icon &&
                    <div className="icon">
                        {icon}
                    </div>
                }
                <div className="label">
                    {title}
                </div>
                {!disableRightIcon &&
                    <div className="icon">
                        <BsChevronDown className='w-4 h-4' />
                    </div>
                }
            </button>
            <div className="group-focus-within:animate-fade-in animate-fade-out flex flex-col transition-all duration-700 ease-in absolute top-full left-0 right-0 z-10 bg-white divide-y divide-gray-100 dark:divide-white/10 rounded-lg border dark:border-white/10 shadow-lg mt-1 w-44 max-w-full max-h-80 overflow-auto dark:bg-black">
                {children}
            </div>
        </div>
    )
}

function Item({ children }) {
    return (
        <div className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/20 dark:hover:text-white">
            {children}
        </div>
    )
}

Dropdown.Item = Item;