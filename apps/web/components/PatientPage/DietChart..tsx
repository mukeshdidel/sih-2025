import React, { useState } from 'react';
import PencilIcon from '../../app/icons/PencilIcon';
import SaveIcon from '../../app/icons/SaveIcon';
import XIcon from '../../app/icons/XIcon';
import Button from '../ui/Button';
import {DietChartType} from '@repo/db/types';
import SwapIcon from '../../app/icons/SwapIcon';

interface MealPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
}

interface WeeklyPlan {
  [key: string]: MealPlan;
}

const DietChart = ({showDietChart, setShowDietChart, patient_id}: {showDietChart: boolean, setShowDietChart: (show: boolean) => void, patient_id: string}) => {

  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedChart, setGeneratedChart] = useState<DietChartType | null>(null);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [error, setError] = useState("");
//   const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({
//     Monday: {
//       breakfast: 'Oatmeal with berries and nuts',
//       lunch: 'Grilled chicken salad with quinoa',
//       dinner: 'Baked salmon with roasted vegetables',
//       snacks: 'Greek yogurt with honey'
//     },
//     Tuesday: {
//       breakfast: 'Avocado toast with poached egg',
//       lunch: 'Turkey and vegetable wrap',
//       dinner: 'Lean beef stir-fry with brown rice',
//       snacks: 'Mixed nuts and dried fruits'
//     },
//     Wednesday: {
//       breakfast: 'Smoothie bowl with banana and granola',
//       lunch: 'Lentil soup with whole grain bread',
//       dinner: 'Grilled tofu with steamed broccoli',
//       snacks: 'Apple slices with almond butter'
//     },
//     Thursday: {
//       breakfast: 'Greek yogurt with granola',
//       lunch: 'Quinoa Buddha bowl',
//       dinner: 'Baked chicken breast with sweet potato',
//       snacks: 'Hummus with carrot sticks'
//     },
//     Friday: {
//       breakfast: 'Scrambled eggs with spinach',
//       lunch: 'Mediterranean chickpea salad',
//       dinner: 'Pan-seared cod with asparagus',
//       snacks: 'Trail mix and herbal tea'
//     },
//     Saturday: {
//       breakfast: 'Whole grain pancakes with berries',
//       lunch: 'Grilled vegetable and hummus wrap',
//       dinner: 'Lean pork tenderloin with quinoa',
//       snacks: 'Dark chocolate and almonds'
//     },
//     Sunday: {
//       breakfast: 'Chia seed pudding with fruits',
//       lunch: 'Asian-style chicken salad',
//       dinner: 'Vegetable curry with brown rice',
//       snacks: 'Smoothie with protein powder'
//     }
//   });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const mealTypes = [
    { key: 'BREAKFAST', label: 'Breakfast', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { key: 'LUNCH', label: 'Lunch', color: 'bg-green-100 text-green-800 border-green-200' },
    { key: 'DINNER', label: 'Dinner', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { key: 'SNACKS', label: 'Snacks', color: 'bg-purple-100 text-purple-800 border-purple-200' }
  ];

//   const handleEdit = (day: string, mealType: string, currentValue: string) => {
//     const cellId = `${day}-${mealType}`;
//     setEditingCell(cellId);
//     setTempValue(currentValue);
//   };

//   const handleSave = (day: string, mealType: string) => {
//     setWeeklyPlan(prev => ({
//       ...prev,
//       [day]: {
//         ...prev[day],
//         [mealType]: tempValue
//       }
//     }));
//     setEditingCell(null);
//     setTempValue('');
//   };

//   const handleCancel = () => {
//     setEditingCell(null);
//     setTempValue('');
//   };

    const generateChart = async () => {
        try {
            if(loading) return;
            setLoading(true);
            const res = await fetch('/api/generatechart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                },
                body: JSON.stringify({ patient_id }),
            });

            const data = await res.json();
            if (data.success) {
                setGeneratedChart(data.chart); 
                console.log(data.chart);    
            }

            if(!res.ok){
                setError(data.error || 'Failed to generate chart');
            }

        } catch (error) {
            console.error("Error generating chart:", error);
        } finally {
            setLoading(false);
        }
    }



    return ( showDietChart && <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
        <div 
        className="bg-slate-400 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-300"
        >
            {/* header */}
            <div className="absolute bg-gray-500 top-0 right-0 rounded-t-2xl flex justify-between p-4 w-full border-b border-gray-300">
                <div>

                </div>
                <div className='flex gap-2'>
                    <Button variant="secondary" size='sm' onClick={() => setShowDietChart(false)}>Close</Button>
                    {/* <Button variant='primary' size='sm' onClick={()=>{}} >Save Changes</Button> */}
                </div>

            </div>

            {/* Content */}
            {
                generatedChart !== null ? <div className="p-6 pt-24 overflow-y-auto max-h-[calc(80vh-80px)]">
                <div className="grid gap-6">
                {days.map((day) => (
                    <div key={day} className="bg-slate-400 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-300 pb-2 ">
                        {day}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {generatedChart.mealSlots.map((mealTime: any) => {
                        const cellId = `${day}-${mealTime}`;
                        const isEditing = editingCell === cellId;
                        const weekDayIndex = days.indexOf(day); // 0 for Monday, 1 for Tuesday, etc.
                        const recipeObj = generatedChart.DietChartRecipe.find(
                          (item: any) => item.WeekDay === weekDayIndex && item.mealTime === mealTime
                        );
                        const currentValue = recipeObj?.recipe?.name || "No meal";

                        return (
                            <div key={mealTime} className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md bg-gray-500`}>
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-sm uppercase tracking-wide">{mealTime}</h4>
                                {!isEditing && (
                                    null
                                // <button
                                //     // onClick={() => handleEdit(day, meal.key, currentValue)}
                                //     className="p-1 bg-gray-800 cursor-pointer hover:bg-gray-600 rounded transition-colors duration-200"
                                // >
                                //     <SwapIcon />
                                // </button>
                                )}
                            </div>
                            {isEditing ? (
                                <div className="space-y-2">
                                <textarea
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                    className="w-full p-2 text-sm border border-gray-300 rounded resize-none bg-white"
                                    rows={2}
                                    autoFocus
                                />
                                <div className="flex space-x-2">
                                    <button
                                    //   onClick={() => handleSave(day, meal.key)}
                                    className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                                    >
                                    <SaveIcon />
                                    </button>
                                    <button
                                    //   onClick={handleCancel}
                                    className="p-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
                                    >
                                    <XIcon />
                                    </button>
                                </div>
                                </div>
                            ) : (
                                <p className="text-sm leading-relaxed">{currentValue}</p>
                            )}
                            </div>
                        );
                        })}
                    </div>
                    </div>
                ))}
                </div>
            </div> : <div className="p-6 pt-24 flex justify-center items-center">
                <button 
                disabled={loading}
                onClick={generateChart} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    {
                        loading ? 'Generating...' : 'Generate Diet Chart'
                    }
                </button>
            </div>
            }   
        </div>
    </div>
    );
};

export default DietChart;