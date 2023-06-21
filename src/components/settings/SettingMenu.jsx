import { MdPublic, MdTranslate, MdWbSunny } from "react-icons/md";
import ThemeSettings from "./ThemeSettings";
import LanguagesList from "./LanguagesList";

export default function SettingMenu({ activeMenu, setActiveMenu}) {

    let comp;

    switch (activeMenu.settings) {
        case 'theme':
            comp = <ThemeSettings handleClick={setActiveMenu} />;
            break;

        case 'language':
            comp = <LanguagesList activeMenu={activeMenu} handleClick={setActiveMenu} />;
            break;

        default:
            comp = <div className="flex flex-col divide-y divide-black/10 dark:divide-white/20">
                <div className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-white/20" onClick={() => setActiveMenu({ ...activeMenu, settings: 'theme' })}>
                    <div className="icon">
                        <MdWbSunny className="w-6 h-6" />
                    </div>
                    <div className="block">{`Appearance: ${activeMenu.theme}`}</div>
                </div>
                <div className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-white/20" onClick={() => setActiveMenu({ ...activeMenu, settings: 'language' })}>
                    <div className="icon">
                        <MdTranslate className="w-6 h-6" />
                    </div>
                    <div className="block">{`Language: ${activeMenu.language} `}</div>
                </div>
                <div className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-white/20" onClick={() => setActiveMenu({ ...activeMenu, settings: 'language' })}>
                    <div className="icon">
                        <MdPublic className="w-6 h-6" />
                    </div>
                    <div className="block">Location: United Kingdom </div>
                </div>
            </div>
            break;
    }

    return comp;
}