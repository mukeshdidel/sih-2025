import { getAuthenticatedUser } from "../../../../lib/utility/beMiddleware";
import { prisma } from "@repo/db/client"


export async function GET(req: Request, {params}: {params: {userId: string}}) {

    try {
        const { userId } = await params;
        const user = await getAuthenticatedUser(req);
        if(!user){
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
        }

        if(user.userType !== "doctor"){
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        const patientData = await prisma.doctorPatient.findMany({
            where: {
                AND: [
                    { doctor_id: user.id },
                    { patient_id: userId }
                ]
            },
            include: {
                patient: true
            }
        })
        return new Response(JSON.stringify(patientData), { status: 200 });        
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to retrieve patient data" }), { status: 500 });
    }

}

