import React, { useState } from 'react'
import Logo from './Logo'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { MdArrowLeft, MdDoorbell, MdMic, MdSearch, MdUpload } from 'react-icons/md'
import { useSidebarContext } from '../contexts/sidebarContext'

export default function PageHeader() {

    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false)

    return (
        <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">

            <PageHeaderFirstSection hidden={showFullWidthSearch} />
            <form
                className={`gap-4 flex-grow justify-center ${showFullWidthSearch ? "flex" : "hidden md:flex"
                    }`}
            >
                {showFullWidthSearch && (
                    <Button
                        onClick={() => setShowFullWidthSearch(false)}
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="flex-shrink-0"
                    >
                        <MdArrowLeft />
                    </Button>
                )}
                <div className="flex flex-grow max-w-[600px]">
                    <input
                        type="search"
                        placeholder="Search"
                        className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
                    />
                    <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
                        <MdSearch />
                    </Button>
                </div>
                <Button type="button" size="icon" className="flex-shrink-0">
                    <MdMic />
                </Button>
            </form>
            <div
                className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"
                    }`}
            >
                <Button
                    onClick={() => setShowFullWidthSearch(true)}
                    size="icon"
                    variant="ghost"
                    className="md:hidden"
                >
                    <MdSearch />
                </Button>
                <Button size="icon" variant="ghost" className="md:hidden">
                    <MdMic />
                </Button>
                <Button size="icon" variant="ghost">
                    <MdUpload />
                </Button>
                <Button size="icon" variant="ghost">
                    <MdDoorbell />
                </Button>
                <Button size="icon" variant="ghost">
                    <Avatar />
                </Button>
            </div>
        </div>
    )
}

export function PageHeaderFirstSection({
    hidden = false,
}) {
    const { toggle } = useSidebarContext()

    return (
        <div
            className={`gap-4 items-center flex-shrink-0 ${hidden ? "hidden" : "flex"
                }`}
        >
            <Button variant="ghost" size="icon">
                <svg fill='currentColor' viewBox="0 0 24 24" focusable="false" className="block h-6 w-6">
                    <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
                </svg>
            </Button>
            <Link to='/' className="logo">
                <Logo className='w-auto h-6 hidden sm:block' />
                <Logo className='w-auto h-6 block sm:hidden' mini={true} />
            </Link>
        </div>
    )
}

