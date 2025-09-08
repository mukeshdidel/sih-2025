
import { prisma } from "@repo/db/client"
import { getAuthenticatedUser } from "../../../lib/utility/beMiddleware";


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

        console.log(data);
        
        return new Response(JSON.stringify("hello"), { status: 200 });        
    } catch (error) {
        console.log(error);
        
        return new Response(JSON.stringify({ error: "Failed to retrieve patient data" }), { status: 500 });
    }

}

