
import { prisma } from "@repo/db/client"
import { getAuthenticatedUser } from "../../../lib/utility/beMiddleware";
import { addPatientSchema } from "../../../lib/types/zod";


export async function POST(req: Request) {

    try {        
        const user = await getAuthenticatedUser(req);
        const data = await req.json()

        if(!user){
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
        }

        if(user.userType !== "doctor"){
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        const result = addPatientSchema.safeParse(data);
        if(!result.success){
            return new Response(JSON.stringify({ error: "Invalid inputs" }), { status: 400 });
        }

        const patientData = result.data;

        const Patient = await prisma.patient.findUnique({
            where: {
                email: patientData.email
            }
        });

        if(!Patient) {
            return new Response(JSON.stringify({ error: "Patient with this email not found" }), { status: 404 });
        }

        const existingAssociation = await prisma.doctorPatient.findFirst({
            where: {
                doctor_id: user.id,
                patient_id: Patient.id
            }
        });

        if(existingAssociation){
            return new Response(JSON.stringify({ error: "Patient already associated with this doctor" }), { status: 400 });
        }

        const dp = await prisma.doctorPatient.create({
            data: {
                doctor_id: user.id,
                patient_id: Patient.id,
                isActivePatient: patientData.status === "Active" ? true : false,
                gender: patientData.gender,
                age: patientData.age,
                height: patientData.height,
                weight: patientData.weight, 
                dietaryHabit: patientData.dietaryHabit,
                mealFrequency: patientData.mealFrequency,
                waterIntake: patientData.waterIntake,
                digestionQuality: patientData.digestionQuality,
                bowelMovement: patientData.bowelMovement,
                lastConsultation: new Date().toISOString(),
                nextConsultation: patientData.nextConsultation ? patientData.nextConsultation : null,
                priority: patientData.priority,
            }
        });
        
        await prisma.patientDosha.createMany({
            data: patientData.Dosha_ids.map((dosha_id: string) => ({
                pd_id: dp.dp_id, 
                dosha_id,
            }))
        });

        return new Response(JSON.stringify({
            message: "Patient added successfully"
        }), { status: 200 });        
    
    } catch (error) {
        console.log(error);
        
        return new Response(JSON.stringify({ error: "Failed to add patient" }), { status: 500 });
    }

}

