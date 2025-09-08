"use client"

import DoctorDashboard from "../../../components/dashboard/DoctorDashboard";
import PatientDashboard from "../../../components/dashboard/PatientDashboard";
import { selectUser } from "../../../lib/store/features/user/userSlice";
import { useAppSelector } from "../../../lib/store/hooks";

const page = () => {

  const user = useAppSelector(selectUser);


  return (
    <div className="h-full">
      {
        user.userType === "doctor" ? <DoctorDashboard userId={user.id} /> : <PatientDashboard userId={user.id} />
      }
    </div>
  )
}

export default page


