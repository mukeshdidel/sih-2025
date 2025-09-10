"use client"

import { useEffect, useState } from "react"
import Button from "../ui/Button"
import PlusIcon from "../../app/icons/PlusIcon"
import UserIcon2 from "../../app/icons/UserIcon2"
import StatOverview from "./StatOverview"
import PatientCard from "./PatientCard"
import AddPatient from "./AddPatient"
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks"
import { selectPatientData, setPatientData } from "../../lib/store/features/patientsData/patientsDataSlice"
import Clock from "../../app/icons/Clock"
import Clock2 from "../../app/icons/Clock2"
import WindIcon from "../../app/icons/WindIcon"
import FireIcon from "../../app/icons/FireIcon"
import Leaf from "../../app/icons/Leaf"

const DoctorDashboard = ({userId}: {userId: string}) => {

    const [filterDosha, setFilterDosha] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [searchText, setSearchText] = useState("")

    const [showAddModal, setShowAddModal] = useState(false)


    const dispatch = useAppDispatch();
    const patientData = useAppSelector(selectPatientData);


    

  return ( 
    <div className="h-full">
        <AddPatient showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
        {/* search and add patient */}
        <div className="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-around px-4 md:px-10 lg:px-10 gap-4">
            <div className="bg-gray-700 p-4 flex-1  my-4 sm:flex sm:lex-col gap-4 rounded-2xl">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e)=>{setSearchText(e.target.value)}}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 outline-1 outline-gray-500 text-white focus:outline-2 focus:outline-gray-400"
                    placeholder="Search by Name"
                />
                <select className="rounded-lg bg-gray-700 outline-1 outline-gray-500 text-white focus:outline-2 focus:outline-gray-400 px-2" value={filterStatus} onChange={(e)=> {setFilterStatus(e.target.value)}}>
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <select className="rounded-lg bg-gray-700 outline-1 outline-gray-500 text-white focus:outline-2 focus:outline-gray-400 px-2" value={filterDosha} onChange={(e)=> {setFilterDosha(e.target.value)}}>
                    <option value="all">All Doshas</option>
                    <option value="Vata">Vata</option>
                    <option value="Pitta">Pitta</option>
                    <option value="Kapha">Kapha</option>
                </select>
            </div>
            <div className="flex justify-center items-center">
                <Button variant="primary" size="md" onClick={()=>{setShowAddModal(true)}}  ><div className="flex gap-2 justify-center items-center"><PlusIcon /><p>Add Patient</p></div></Button>
            </div>
        </div>
        {/* extra content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 px-4 md:px-10 lg:px-10 md:py-6 lg:py-8">
            <StatOverview text="Total Patients" number={patientData.length} Icon={<UserIcon2 />} />
            <StatOverview text="Total Active" number={patientData.filter(p => p.isActivePatient).length} Icon={<Clock2 />} />
            <StatOverview text="Total Vata imbalanced" number={patientData.filter(p => p.PatientDosha.some(d => d.dosha.name === "Vata")).length} Icon={<WindIcon />} />
            <StatOverview text="Total Pitta imbalanced" number={patientData.filter(p => p.PatientDosha.some(d => d.dosha.name === "Pitta")).length} Icon={<FireIcon />} />
            <StatOverview text="Total Kapha imbalanced" number={patientData.filter(p => p.PatientDosha.some(d => d.dosha.name === "Kapha")).length} Icon={<Leaf />} />
        </div>
        {/* patient list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-4 md:px-10 lg:px-10">
            {
                patientData.filter( p => (filterStatus === "all" || (filterStatus === "Active" ? p.isActivePatient : !p.isActivePatient)) && (filterDosha === "all" || p.PatientDosha.some(d => d.dosha.name === filterDosha)) && p.patient.name!.toLowerCase().includes(searchText.toLowerCase())).map(p => <div key={p.patient.id}><PatientCard id={p.patient.id!} email={p.patient.email!} name={p.patient.name!} age={p.age} gender={p.gender} /></div> )
            }
        </div>
    </div>
  )
}

export default DoctorDashboard


