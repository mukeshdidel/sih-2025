"use client"
import { ReactNode, useEffect, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import jwt from "jsonwebtoken"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "../../lib/store/hooks"
import { setuser } from "../../lib/store/features/user/userSlice"
import { setPatientData } from "../../lib/store/features/patientsData/patientsDataSlice"

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
  const [loading, setLoading] = useState(false);

  async function fetchDoctorData() {
      setLoading(true)
      try {
          const res = await fetch(`/api/patientdata`, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('authToken')}` || ''
              }
          });
          const data = await res.json();
          // @ts-ignore
          dispatch(setPatientData(data));
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/auth/signin");
      return;
    }

    try {
      const decoded: DecodedToken = jwt.decode(token) as DecodedToken;
      dispatch(setuser({name: decoded.name, email: decoded.email, userType: decoded.userType, id: decoded.id}));
      if(decoded.userType === "doctor"){
        fetchDoctorData();
      }
    } catch {
      localStorage.removeItem("authToken");
      router.push("/auth/signin");
    }
  }, [router]);
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 bg-fixed">
      <Topbar setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="relative flex-1 mt-16">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={`h-full ${isOpen ? "lg:ml-80 md:ml-60" : "ml-0 lg:ml-30"} transition-all duration-300 ease-in-out`}>
          { loading ? <h1 className="font-bold text-xl text-white">Loading...</h1> : children }
        </div>
      </div>
    </div>
  )
}

export default layout