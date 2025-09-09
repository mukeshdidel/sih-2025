import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store' 
import {DoctorPatientType} from '@repo/db/types'

export type patientDataState = DoctorPatientType[]

export const patientDataSlice = createSlice({
  name: 'patientData',
  initialState: [] as patientDataState,
  reducers: {
        setPatientData: (state, action: PayloadAction<patientDataState>) => {
            return action.payload
        }
    }
})

export const {  setPatientData } = patientDataSlice.actions
export const selectPatientData = (state: RootState) => state.patientsData
export default patientDataSlice.reducer