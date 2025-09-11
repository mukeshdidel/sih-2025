import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import type { RootState } from '../../store' 
import {DoctorPatientType} from '@repo/db/types'

export type patientDataState = DoctorPatientType[]

export const patientDataSlice: Slice<patientDataState> = createSlice({
  name: 'patientData',
  initialState: [] as patientDataState,
  reducers: {
        setPatientData: (state, action: PayloadAction<patientDataState>) => {
            return action.payload
        }
    }
})

export const {  setPatientData } = patientDataSlice.actions
// ✅ Explicit return type added here
export const selectPatientData = (state: RootState) =>
  state.patientsData

// ✅ Explicit return type added here
export const selectPatientById = (
  state: RootState,
  patientId: string
): DoctorPatientType | undefined =>
  state.patientsData.find((patient) => patient.patient_id === patientId)


export default patientDataSlice.reducer