import { useState } from "react";
import UserIcon2 from "../../app/icons/UserIcon2";
import Leaf from "../../app/icons/Leaf";
// import XIcon from "../../app/icons/XIcon";
import Input from "../ui/Input";
import Utensils from "../../app/icons/Utensils";
import Button from "../ui/Button";

interface Patient {
    email: string;
    height: number;
    weight: number;
    age: number;
    gender: 'MALE' | 'FEMALE';

    // Dosha_ids: ['cmfchx8ep000ccmoqglwagbov' | 'cmfchx8ep000dcmoq3nxf2u44' | 'cmfchx8ep000ecmoqsvbuxc9z']; // vata = 'cmfchx8ep000ccmoqglwagbov' pitta = cmfchx8ep000dcmoq3nxf2u44 kapha = cmfchx8ep000ecmoqsvbuxc9z
    Dosha_names: ['Vata' | 'Pitta' | 'Kapha'];
    dietaryHabit: 'VEGETARIAN' | 'VEGAN' | 'NON_VEGETARIAN' | 'EGGITARIAN';
    mealFrequency: number;
    bowelMovement: 'REGULAR' | 'CONSTIPATED' | 'LOOSE';
    waterIntake: number;
    digestionQuality: "EXCELLENT" | "GOOD" | "AVERAGE" | "POOR";
    chc: string[];
    nextAppointment?: string;
    status: 'Active' | 'Inactive';
    priority: 'low' | 'medium' | 'high';
}


const AddPatient = ({ showAddModal, setShowAddModal }: { showAddModal: boolean; setShowAddModal: (show: boolean) => void; }) => {

    const [newPatient, setNewPatient] = useState<Partial<Patient>>({
        email: '',
        age: 0,
        height: 0,
        weight: 0,
        gender: 'MALE',
        // Dosha_ids: ['cmfchx8ep000ccmoqglwagbov'],
        Dosha_names: ['Vata'],
        dietaryHabit: 'VEGAN',
        mealFrequency: 3,
        bowelMovement: 'REGULAR',
        waterIntake: 2,
        digestionQuality: "AVERAGE",
        chc: [],
        status: 'Active',
        priority: 'medium',
    });

    async function handleAddPatient() {
        try {
            const res =  await fetch('/api/addpatient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` || ''
                },
                body: JSON.stringify(newPatient),
            });
        } catch (error) {
            
        }
    }

    return showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-500 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">

                {/* <div className="bg-green-800 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                    <div className="bg-white bg-opacity-20 p-2 rounded-xl">
                        <UserIcon2 />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Add New Patient</h2>
                        <p className="text-green-100">Complete Ayurvedic Assessment</p>
                    </div>
                    </div>
                    <button
                    onClick={() => setShowAddModal(false)}
                    className="bg-gray-800 text-white bg-opacity-20 cursor-pointer hover:bg-opacity-30 p-2 rounded-xl transition-all duration-200"
                    >
                    <XIcon />
                    </button>
                </div>
                </div> */}

                <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <UserIcon2  />
                        <p className="ml-2">Personal Information</p>
                        </h3>
                        <div className="space-y-4">
                            <Input label="Email *" value={newPatient.email!} onChange={(e) => setNewPatient({...newPatient, email: e.target.value})} placeholder="Email" type="email" />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Age *" value={newPatient.age!} onChange={(e) => setNewPatient({...newPatient, age: parseInt(e.target.value)})} placeholder="Age" type="number" />
                            <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                            <select
                                value={newPatient.gender}
                                onChange={(e) => setNewPatient({...newPatient, gender: e.target.value as Patient['gender']})}
                                className="w-full px-4 py-3 border border-gray-200 text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Height(cm) *" value={newPatient.height!} onChange={(e) => setNewPatient({...newPatient, height: parseInt(e.target.value)})} placeholder="Height" type="number" />
                            <div>
                            <Input label="Weight(kg) *" value={newPatient.weight!} onChange={(e) => setNewPatient({...newPatient, weight: parseInt(e.target.value)})} placeholder="Weight" type="number" />
                            </div>
                        </div>   

                        </div>
                    </div>
                        
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Leaf />
                        <p className="ml-2">Ayurvedic Constitution</p>
                        </h3>
                        <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Dosha</label>
                            <select
                                value={newPatient.Dosha_names![0]}
                                onChange={(e) => setNewPatient({...newPatient, Dosha_names: [e.target.value as Patient['Dosha_names'][0]]})}
                                className="w-full px-4 py-3 border border-gray-200 text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="Vata">Vata</option>
                                <option value="Pitta">Pitta</option>
                                <option value="Kapha">Kapha</option>
                            </select>                           
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Status</label>
                            <select
                                value={newPatient.status}
                                onChange={(e) => setNewPatient({...newPatient, status: e.target.value as Patient['status']})}
                                className="w-full px-4 py-3 border border-gray-200 text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            </div>
                            <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Priority</label>
                            <select
                                value={newPatient.priority}
                                onChange={(e) => setNewPatient({...newPatient, priority: e.target.value as Patient['priority']})}
                                className="w-full px-4 py-3 border border-gray-200 text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Ayurvedic Assessment */}
                    <div className="space-y-6">                
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Utensils />
                        <p className="ml-2">Dietary & Lifestyle</p>
                        </h3>
                        <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Dietary Habits</label>
                            <select
                            value={newPatient.dietaryHabit}
                            onChange={(e) => setNewPatient({...newPatient, dietaryHabit: e.target.value as Patient['dietaryHabit']})}
                            className="w-full px-4 py-3 border border-gray-200 text-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                            <option value="VEGETARIAN">Vegetarian</option>
                            <option value="VEGAN">Vegan</option>
                            <option value="NON_VEGETARIAN">Non-Vegetarian</option>
                            <option value="EGGITARIAN">Eggitarian</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Meals per Day</label>
                            <input
                                type="number"
                                min="1"
                                max="6"
                                value={newPatient.mealFrequency}
                                onChange={(e) => setNewPatient({...newPatient, mealFrequency: parseInt(e.target.value)})}
                                className="w-full px-4 py-3 border border-gray-200 text-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            </div>
                            <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Water Intake (L/day)</label>
                            <input
                                type="number"
                                min="0"
                                max="10"
                                value={newPatient.waterIntake}
                                onChange={(e) => setNewPatient({...newPatient, waterIntake: parseFloat(e.target.value)})}
                                className="w-full px-4 py-3 border border-gray-200 text-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Bowel Movements</label>
                            <select
                            value={newPatient.bowelMovement}
                            onChange={(e) => setNewPatient({...newPatient, bowelMovement: e.target.value as Patient['bowelMovement']})}
                            className="w-full px-4 py-3 border border-gray-200 text-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                            <option value="REGULAR">Regular</option>
                            <option value="CONSTIPATED">Constipated</option>
                            <option value="LOOSE">Loose</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Digestion Quality</label>
                            <select
                            value={newPatient.digestionQuality}
                            onChange={(e) => setNewPatient({...newPatient, digestionQuality: e.target.value as Patient['digestionQuality']})}
                            className="w-full px-4 py-3 border border-gray-200 text-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="EXCELLENT">Excellent</option>
                                <option value="GOOD">Good</option>
                                <option value="AVERAGE">Average</option>
                                <option value="POOR">Poor</option>
                            </select>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                    <Button
                        size="md"
                        variant="secondary" 
                        onClick={()=>{setShowAddModal(false)}} 
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="primary"
                        size="md"
                        onClick={handleAddPatient}
                    >
                        Add Patient
                    </Button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default AddPatient