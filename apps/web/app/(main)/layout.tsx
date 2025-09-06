"use client"
import { ReactNode, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"

const layout = ({ children }: { children: ReactNode }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col min-h-screen bg-gray-900">
      <Topbar setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="lg:flex flex-1 relative">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout