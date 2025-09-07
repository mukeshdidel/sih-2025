"use client"

import { selectUser } from "../../../lib/store/features/user/userSlice";
import { useAppSelector } from "../../../lib/store/hooks";

const page = () => {

  const user = useAppSelector(selectUser);

  return (
    <div className="h-full text-white">
      <h1>Dashboard</h1>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <p>Please log in to see your dashboard</p>
      )}
    </div>
  )
}

export default page


