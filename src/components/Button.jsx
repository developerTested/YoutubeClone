import classNames from "classnames"

export const buttonStyles = classNames(["transition-colors"], {
    variants: {
        variant: {
            default: ["bg-secondary", "hover:bg-secondary-hover"],
            ghost: ["hover:bg-gray-100"],
            dark: [
                "bg-secondary-dark",
                "hover:bg-secondary-dark-hover",
                "text-secondary",                
                "dark:bg-slate-100",
                "dark:text-black"
            ],
        },
        size: {
            default: [" rounded", "p-2"],
            icon: [
                "rounded-full",
                "w-10",
                "h-10",
                "flex",
                "items-center",
                "justify-center",
                "p-2.5",
            ],
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
})

export function Button({ variant, size, className, ...props }) {
    return (
        <button
            {...props}
            className={classNames(buttonStyles, className)}
        />
    )
}
