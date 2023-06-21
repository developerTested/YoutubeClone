import React from "react";
import { MdArrowBack, MdCheck, MdDesktopWindows, MdWbSunny } from "react-icons/md";
import { useApp } from "../../contexts/contextApi";

export const themeData = [
    {
        label: 'system',
        title: 'System Theme',
        icon: <MdDesktopWindows className="w-6 h-6" />,
    },
    {
        label: 'light',
        title: 'Light Theme',
        icon: <MdWbSunny className="w-6 h-6" />,
    },
    {
        label: 'dark',
        title: 'Dark Theme',
        icon: <svg className='w-6 h-6 block' fill='currentColor' focusable="false" aria-hidden="true" viewBox="0 0 24 24" title="Dark Mode"><path d="M11.1 12.08c-2.33-4.51-.5-8.48.53-10.07C6.27 2.2 1.98 6.59 1.98 12c0 .14.02.28.02.42.62-.27 1.29-.42 2-.42 1.66 0 3.18.83 4.1 2.15 1.67.48 2.9 2.02 2.9 3.85 0 1.52-.87 2.83-2.12 3.51.98.32 2.03.5 3.11.5 3.5 0 6.58-1.8 8.37-4.52-2.36.23-6.98-.97-9.26-5.41z"></path><path d="M7 16h-.18C6.4 14.84 5.3 14 4 14c-1.66 0-3 1.34-3 3s1.34 3 3 3h3c1.1 0 2-.9 2-2s-.9-2-2-2z"></path></svg>,
    }
];

export default function ThemeSettings(props) {
    const { theme, setTheme } = useApp();


    const handleTheme = (themeTitle) => {

        const newTheme = themeData.filter((x) => x.label === theme);

        props.handleClick({ ...props.activeMenu, theme: themeTitle });
        setTheme(newTheme.label);
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2">
                <div className="icon cursor-pointer">
                    <MdArrowBack className="w-6 h-6" onClick={() => props.handleClick({ settings: null })} />
                </div>
                <div className="block">Appearance</div>
            </div>
            <hr className="border-black/10 dark:border-white/20" />
            <div className="px-4 py-2">
                <div className="text-xs">Setting applies to this browser only</div>
            </div>

            {themeData.map((item, index) => (
                <div key={index} onClick={() => handleTheme(item.title)} className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-white/20">
                    <div className="icon">
                        {item.icon}
                    </div>
                    <div className="block">{item.title}</div>
                    {theme === item.label ? <MdCheck className="w-6 h-6 ml-auto text-green-500" /> : ''}
                </div>
            ))}
        </div>
    )
}

ThemeSettings.title = "Appearance";