"use client"

import Leaf from "../../app/icons/Leaf"
import ThreeLines from "../../app/icons/ThreeLines"
import UserIcon from "../../app/icons/UserIcon"


const Topbar = ({setIsOpen, isOpen}: {setIsOpen: (isOpen: boolean) => void, isOpen: boolean}) => {

    // todo add profile icon and dropdown

    return (
        <div className=" h-16 bg-gray-800 border-b border-slate-700 flex items-center justify-between px-4 ">
            <div className="flex gap-2">
                <div className="text-white cursor-pointer lg:ml-6 p-2 rounded-md hover:bg-gray-700" onClick={() => {setIsOpen(!isOpen)}}>
                    <ThreeLines />
                </div>
                <div className="flex items-center justify-start gap-0.5">
                    <div className="w-10 h-10 rounded-xl text-green-500 flex justify-center items-center" >
                       <Leaf />
                    </div>
                    <p className={`font-bold lg:font-extrabold text-xl lg:text-2xl text-green-500`}>
                        App Name
                    </p>
                </div>              
            </div>
            <div className="text-white pr-16 cursor-pointer">
                <UserIcon />
            </div>
            
        </div>
    )
}

export default Topbar