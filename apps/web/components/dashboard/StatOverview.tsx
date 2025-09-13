import { ReactNode } from "react";

const StatOverview = ({ text, number, Icon}: { text: string; number: number; Icon: ReactNode }) => {
  return (
    <div className="bg-slate-500 rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="flex items-center justify-between text-white">
            <div>
            <p className="text-lg font-bold text-white">{text}</p>
            <p className="text-3xl font-bold text-white">{number}</p>
            </div>
            {Icon}
        </div>
    </div>
  )
}

export default StatOverview