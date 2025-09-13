"use client"
import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation";

const Element = ({icon, label, href, isOpen}: {icon: ReactNode, label: string, href: string, isOpen: boolean}) => {

    const pathname = usePathname();
    const isActive = pathname === href;


    return (
        <Link
            href={href}
            className={`flex gap-2 px-4 h-10 items-center rounded-lg text-white transition-all duration-200 ease-in-out ${isActive ? " bg-blue-500" : "hover:bg-slate-700"}`}
        >
            <div className="flex justify-center ">
                {icon}  
            </div>
            <p className={`text-xl ${isOpen ? "lg:block" : "lg:hidden"}`}>{label}</p>
        </Link>
    )
}

export default Element