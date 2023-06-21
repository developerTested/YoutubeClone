import React from "react";
import { MdArrowBack, MdCheck } from "react-icons/md";

export default function LanguagesList({ activeMenu, ...props }) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2">
                <div className="icon cursor-pointer">
                    <MdArrowBack className="w-6 h-6" onClick={() => props.handleClick({ settings: null })} />
                </div>
                <div className="block">Languages</div>
            </div>
            <hr className="border-black/10 dark:border-white/20" />
            {[{
                icon: 'fa',
                title: 'English',
                label: 'english',
            }].map((item, index) => (
                <div key={index} onClick={() => { props.handleClick({ theme: item.title }); setTheme(item.label) }} className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-white/20">
                    <div className="icon">
                        {item.icon}
                    </div>
                    <div className="block">{item.title}</div>
                    {activeMenu.language === item.label ? <MdCheck className="w-6 h-6 ml-auto" /> : ''}
                </div>
            ))}

        </div>
    )
}