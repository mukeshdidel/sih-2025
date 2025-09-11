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
    email: z.email(),
    height: z.number().min(0).max(300),
    weight: z.number().min(0).max(500),
    age: z.number().min(0).max(150),
    gender: z.enum(['MALE', 'FEMALE']),
    Dosha_names: z.array(z.string()),
    dietaryHabit: z.enum(['VEGETARIAN', 'VEGAN', 'NON_VEGETARIAN', 'EGGITARIAN']),
    mealFrequency: z.number().min(1).max(10),
    bowelMovement: z.enum(['REGULAR', 'CONSTIPATED', 'LOOSE']),
    waterIntake: z.number().min(0).max(10),
    digestionQuality: z.enum(['EXCELLENT', 'GOOD', 'AVERAGE', 'POOR']),
    chc: z.array(z.string()).optional(),
    nextConsultation: z.date().optional(),
    status: z.enum(['Active', 'Inactive']),
    priority: z.enum(['low', 'medium', 'high']),
})
