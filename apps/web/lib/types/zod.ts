import z from "zod";

export const signupSchema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    password: z.string().min(1).max(100),
    userType: z.enum(["patient", "doctor"]),
})


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1).max(100),
})



export const addPatientSchema = z.object({
    patient_id: z.string()
})