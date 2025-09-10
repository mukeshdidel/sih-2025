"use client"
import { DoctorPatientType } from '@repo/db/types';
import { useState } from 'react';
import ActivityIcon from '../../app/icons/ActivityIcon';
import PencilIcon from '../../app/icons/PencilIcon';
import SaveIcon from '../../app/icons/SaveIcon';
import XIcon from '../../app/icons/XIcon';
import Button from '../ui/Button';



const HealthMetricsCard= ({ patientData}: { patientData: DoctorPatientType }) => {
    console.log(patientData);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(patientData);

  const handleSave = () => {
    // onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(patientData);
    setIsEditing(false);
  };

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const bmi = calculateBMI(patientData.weight, patientData.height);
  const bmiInfo = getBMICategory(parseFloat(bmi));

  return (
    <div className="bg-gray-700 rounded-xl shadow-sm border border-gray-500 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 text-green-600">
          <ActivityIcon />
          <h2 className="text-xl font-semibold text-white">Health Metrics</h2>
        </div>
        {!isEditing ? (
            <Button variant="primary" size="sm" onClick={() => setIsEditing(true)} ><div className='flex gap-2 '><PencilIcon /><p>Edit</p></div></Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm" onClick={handleCancel} ><div className='flex gap-2 '><XIcon /><p>Cancel</p></div></Button>
            <Button variant="primary" size="sm" onClick={handleSave} ><div className='flex gap-2 '><SaveIcon /><p>Save</p></div></Button>  
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Metrics */}
        <div className="space-y-4">
          <h3 className="font-medium text-white border-b border-gray-500 pb-2">Basic Info</h3>
          
          <div>
            <label className="block text-sm font-medium text-white mb-1">Gender</label>
            {isEditing ? (
              <select
                value={editData.gender}
                onChange={(e) => setEditData({ ...editData, gender: e.target.value as typeof patientData.gender })}
                className="w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            ) : (
              <p className="text-white">{patientData.gender.charAt(0) + patientData.gender.slice(1).toLowerCase()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Age</label>
            {isEditing ? (
              <input
                type="number"
                value={editData.age}
                onChange={(e) => setEditData({ ...editData, age: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="120"
              />
            ) : (
              <p className="text-gray-300">{patientData.age} years</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Priority</label>
            {isEditing ? (
              <select
                value={editData.priority}
                onChange={(e) => setEditData({ ...editData, priority: e.target.value as typeof patientData.priority })}
                className="w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            ) : (
              <p className="text-gray-300">{patientData.priority.charAt(0).toUpperCase() + patientData.priority.slice(1)}</p>
            )}
          </div>
        </div>

        {/* Physical Metrics */}
        <div className="space-y-4">
          <h3 className="font-medium text-white border-b border-gray-500 pb-2">Physical</h3>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Height (cm)</label>
            {isEditing ? (
              <input
                type="number"
                value={editData.height}
                onChange={(e) => setEditData({ ...editData, height: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="50"
                max="250"
                step="0.1"
              />
            ) : (
              <p className="text-gray-300">{patientData.height} cm</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Weight (kg)</label>
            {isEditing ? (
              <input
                type="number"
                value={editData.weight}
                onChange={(e) => setEditData({ ...editData, weight: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="500"
                step="0.1"
              />
            ) : (
              <p className="text-gray-300">{patientData.weight} kg</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">BMI</label>
            <div className="flex items-center space-x-2">
              <p className="text-gray-300 font-medium">{bmi}</p>
              <span className={`text-sm font-medium ${bmiInfo.color}`}>
                ({bmiInfo.category})
              </span>
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="space-y-4">
          <h3 className="font-medium text-white border-b border-gray-500 pb-2">Lifestyle</h3>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Dietary Habit</label>
            {isEditing ? (
              <select
                value={editData.dietaryHabit}
                onChange={(e) => setEditData({ ...editData, dietaryHabit: e.target.value as typeof patientData.dietaryHabit })}
                className="w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="VEGETARIAN">Vegetarian</option>
                <option value="NON_VEGETARIAN">Non-Vegetarian</option>
                <option value="VEGAN">Vegan</option>
                <option value="EGGITARIAN">Eggitarian</option>
              </select>
            ) : (
              <p className="text-gray-300">{patientData.dietaryHabit.charAt(0) + patientData.dietaryHabit.slice(1).toLowerCase().replace('_', ' ')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Meal Frequency (per day)</label>
            {isEditing ? (
              <input
                type="number"
                value={editData.mealFrequency}
                onChange={(e) => setEditData({ ...editData, mealFrequency: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="10"
              />
            ) : (
              <p className="text-gray-300">{patientData.mealFrequency} times</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Water Intake (liters)</label>
            {isEditing ? (
              <input
                type="number"
                value={editData.waterIntake}
                onChange={(e) => setEditData({ ...editData, waterIntake: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max="10"
                step="0.1"
              />
            ) : (
              <p className="text-gray-300">{patientData.waterIntake} L</p>
            )}
          </div>
        </div>

        {/* Health Indicators */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-300 border-b border-gray-200 pb-2">Health Status</h3>
          
          <div>
            <label className="block text-sm font-medium text-white mb-1">Digestion Quality</label>
            {isEditing ? (
              <select
                value={editData.digestionQuality}
                onChange={(e) => setEditData({ ...editData, digestionQuality: e.target.value as typeof patientData.digestionQuality })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="EXCELLENT">Excellent</option>
                <option value="GOOD">Good</option>
                <option value="AVERAGE">Average</option>
                <option value="POOR">Poor</option>
              </select>
            ) : (
              <p className="text-white">{patientData.digestionQuality.charAt(0) + patientData.digestionQuality.slice(1).toLowerCase().replace('_', ' ')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Bowel Movement</label>
            {isEditing ? (
              <select
                value={editData.bowelMovement}
                onChange={(e) => setEditData({ ...editData, bowelMovement: e.target.value as typeof patientData.bowelMovement })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="REGULAR">Regular</option>
                <option value="CONSTIPATION">Constipation</option>
                <option value="LOOSE">Loose</option>
              </select>
            ) : (
              <p className="text-gray-300">{patientData.bowelMovement.charAt(0) + patientData.bowelMovement.slice(1).toLowerCase()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Active Patient</label>
            {isEditing ? (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editData.isActivePatient}
                  onChange={(e) => setEditData({ ...editData, isActivePatient: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">Active Patient</span>
              </label>
            ) : (
              <p className="text-gray-300">{patientData.isActivePatient ? 'Yes' : 'No'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMetricsCard;