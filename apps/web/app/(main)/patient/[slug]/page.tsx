"use client";
import { useParams } from "next/navigation";
import { useAppSelector } from "../../../../lib/store/hooks";
import { selectPatientById } from "../../../../lib/store/features/patientsData/patientsDataSlice";

import UserIcon3 from "../../../icons/UserIcon3";
import MailIcon from "../../../icons/MailIcon";
import FileTextIcon from "../../../icons/FileTextIcon";
import CalendarIcon from "../../../icons/CalendarIcon";
import Clock from "../../../icons/Clock";
import HealthMetricsCard from "../../../../components/PatientPage/HealthMetricsCard";
import { useState } from "react";
import DietChart from "../../../../components/PatientPage/DietChart.";

const page = () => {

    const params = useParams();

    const [showDietChart, setShowShowDietChart] = useState(false);
    const patient = useAppSelector(state => selectPatientById(state, params.slug as string));
    
    if(!patient){
        return <div className="h-full flex justify-center items-center text-2xl text-white font-bold">Patient not found</div>
    }



    return (
        <div className="h-full text-white px-4 md:px-10 lg:px-10 mt-10">
            <DietChart setShowDietChart={setShowShowDietChart} showDietChart={showDietChart} patient_id={params.slug as string} />
            <div className="rounded-2xl bg-slate-500 p-4 lg:p-6 ">
                <div className="flex justify-between items-center mb-4 flex-wrap">
                    <div className="flex gap-2">
                        <div className="bg-green-400 p-4 rounded-full">
                            <UserIcon3 />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold">{patient.patient.name}</h1>
                            <span className="text-sm text-gray-300">{patient.age} years old</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className={`p-2`}>
                            {
                                patient.isActivePatient ? <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Active</span> : <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Inactive</span>
                            }
                        </div>
                        <div className={`p-2`}>
                            {
                                patient.priority === "high" ? <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">High Priority</span> : patient.priority === "medium" ? <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Medium Priority</span> : <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Low Priority</span>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 pl-4 pt-2 mb-10">
                    <MailIcon />
                    <span className="text-gray-300">{patient.patient.email}</span>
                </div>
                <hr />
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-xl mt-6 mb-2 ">Last Consultation</h2>
                        <p>
                          {patient.lastConsultation
                            ? new Date(patient.lastConsultation).toLocaleDateString()
                            : "N/A"}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl mt-6 mb-2 lg:pr-20 md:pr-10">Next Consultation</h2>
                        <p>
                          {patient.nextConsultation
                            ? new Date(patient.nextConsultation).toLocaleDateString()
                            : "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        {/* Action Buttons */}
            <div className="my-8 ">
                <div className="flex flex-wrap gap-4">
                    <button
                    onClick={() => setShowShowDietChart(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                    <FileTextIcon />
                    <span>New Diet Chart</span>
                    </button>
                    <button
                    // onClick={handleScheduleConsultation}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                    >
                    <CalendarIcon />
                    <span>Schedule Consultation</span>
                    </button>
                </div>
            </div>
            {/* Health Metrics */}
            <div className="mb-8">
                <HealthMetricsCard
                    patientData={patient}
                />
            </div>
        </div>
    )
}

export default page