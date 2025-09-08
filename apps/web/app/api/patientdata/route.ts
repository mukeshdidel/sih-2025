
import { prisma } from "@repo/db/client"
import { getAuthenticatedUser } from "../../../lib/utility/beMiddleware";


export async function GET(req: Request) {

    try {        
        const user = await getAuthenticatedUser(req);

        if(!user){
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
        }

        if(user.userType !== "doctor"){
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }

        const patientData = await prisma.doctorPatient.findMany({
            where: {
                doctor_id: user.id
            },
            include: {
                patient: true
            }
        })

        return new Response(JSON.stringify(patientData), { status: 200 });        
    } catch (error) {
        console.log(error);
        
        return new Response(JSON.stringify({ error: "Failed to retrieve patient data" }), { status: 500 });
    }

}

