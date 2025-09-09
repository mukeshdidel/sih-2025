"use client"

import Homeicon from "../../app/icons/Homeicon";
import Element from "./Element";



const Sidebar = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) => {


    return (
    <div className={`mt-16
        ${isOpen
            ? "fixed top-0 left-0 h-screen lg:w-80 md:w-60 w-60"
            : "lg:fixed top-0 left-0 lg:w-30 lg:block hidden"}
        lg:h-full border-r border-slate-700 bg-gray-800 z-20 transition-all duration-300 ease-in-out`}>
            <div className="h-full p-4">
                {/* elements */}
                <div className="flex flex-col mx-4 my-4 gap-2 text-green-500">
                    <Element icon={<Homeicon />} label="Dashboard" href="/dashboard" isOpen={isOpen}  />
                    <Element icon={<></>} label="Other Page" href="/" isOpen={isOpen} />
                    <Element icon={<></>} label="Other Page 2" href="/" isOpen={isOpen} />
                </div>
            </div>
        </div>
    )
}

export default Sidebar