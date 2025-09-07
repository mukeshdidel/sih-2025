"use client"
import { ReactNode, useEffect, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import jwt from "jsonwebtoken"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "../../lib/store/hooks"
import { setuser } from "../../lib/store/features/user/userSlice"

interface DecodedToken {
  email: string;
  id: string;
  userType: "doctor" | "patient";
  name: string; 
}

const layout = ({ children }: { children: ReactNode }) => {


  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");


    console.log(  token);
    

    if (!token) {
      router.push("/auth/signin");
      return;
    }

    try {
      const decoded: DecodedToken = jwt.decode(token) as DecodedToken;
      dispatch(setuser({name: decoded.name, email: decoded.email, userType: decoded.userType, id: decoded.id}));
    } catch {
      localStorage.removeItem("authToken");
      router.push("/auth/signin");
    }
  }, [router]);
  

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