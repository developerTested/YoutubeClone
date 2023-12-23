
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import React, { useEffect, useRef, useState } from "react"
import { Button } from "../components/Button"
import classNames from "classnames"

const TRANSLATE_AMOUNT = 200

export default function ChipList({ items = [], loading = true }) {


    if (loading && !items) {
        return (
            <div className="block">

            </div>
        )
    }

    const [translate, setTranslate] = useState(0)
    const [isLeftVisible, setIsLeftVisible] = useState(false)
    const [isRightVisible, setIsRightVisible] = useState(false)

    const [chipActive, setChipActive] = useState('all');

    const handleChipClick = (text) => {
        const selected = text.toLowerCase();
        setChipActive(selected);
    }

    const containerRef = useRef(null)

    useEffect(() => {
        if (containerRef.current == null) return

        const observer = new ResizeObserver(entries => {
            const container = entries[0]?.target
            if (container == null) return

            setIsLeftVisible(translate > 0)
            setIsRightVisible(
                translate + container.clientWidth < container.scrollWidth
            )
        })

        observer.observe(containerRef.current)

        return () => {
            observer.disconnect()
        }
    }, [items, translate])

    return (
        <div ref={containerRef} className="overflow-x-hidden relative">
            <div
                className="flex whitespace-nowrap gap-2 transition-transform w-[max-content]"
                style={{ transform: `translateX(-${translate}px)` }}
            >
                {items.length ? items.map(category => (
                    <div
                        key={category.title}
                        onClick={() => handleChipClick(category.title)}
                        variant={chipActive === category?.title?.toLowerCase() ? "dark" : "default"}
                        className={classNames(
                            ' transition-all ease-in-out shrink-0 cursor-pointer font-semibold text-sm block rounded-lg text-center py-1.5 px-3 whitespace-nowrap',
                            {
                                'bg-black text-white dark:bg-white dark:text-black': Boolean(chipActive.toLowerCase() === category?.title?.toLowerCase()),
                                'bg-slate-100 dark:bg-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black': !Boolean(chipActive.toLowerCase() === category?.title?.toLowerCase()),

                            })}
                    >
                        {category.title}
                    </div>

                )) : ''}
            </div>
            {isLeftVisible && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white dark:from-black from-50% to-transparent w-24 h-full">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full p-1.5 shadow-lg border"
                        onClick={() => {
                            setTranslate(translate => {
                                const newTranslate = translate - TRANSLATE_AMOUNT
                                if (newTranslate <= 0) return 0
                                return newTranslate
                            })
                        }}
                    >
                        <MdChevronLeft className="w-6 h-6" />
                    </Button>
                </div>
            )}
            {isRightVisible && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white dark:from-black from-50% to-transparent w-24 h-full  flex justify-end">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full p-1.5 shadow-lg border"
                        onClick={() => {
                            setTranslate(translate => {
                                if (containerRef.current == null) {
                                    return translate
                                }
                                const newTranslate = translate + TRANSLATE_AMOUNT
                                const edge = containerRef.current.scrollWidth
                                const width = containerRef.current.clientWidth
                                if (newTranslate + width >= edge) {
                                    return edge - width
                                }
                                return newTranslate
                            })
                        }}
                    >

                        <MdChevronRight className="w-6 h-6" />
                    </Button>
                </div>
            )}
        </div>
    )
}
