import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "../../../types/zod";
import { prisma} from "@repo/db/client"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body);

        const result = signupSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: "invalid inputs" }, { status: 400 });
        }

        console.log(1);
        
        const { name, email, password, userType } = result.data;



        const existingDoc = await prisma.doctor.findUnique({ where: { email } });
        const existingPatient = await prisma.patient.findUnique({ where: { email } });        

        console.log(2);
        
        if (existingDoc || existingPatient) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        console.log(3);
        
        
        // Create new user
        const hassedPassword = await bcrypt.hash(password, 10);

   
        console.log(4);
        
        if(userType === "doctor"){
            const newUser = await prisma.doctor.create({
                data: {
                    name, 
                    email,
                    password: hassedPassword
                }
            })

            console.log(5.1);
            
            const token = jwt.sign({
                email: newUser.email,
                id: newUser.id,
                userType: "doctor",
                name: newUser.name
            }, process.env.JWT_SECRET!)

            console.log(6.2);
            

            return NextResponse.json({
                message: "User created successfully",
                token
            }, {
                status: 200
            })
        } else {
            const newUser = await prisma.patient.create({
                data: {
                    name,
                    email,
                    password: hassedPassword,
                }
            })

            console.log(5.2);
            

            const token = jwt.sign({
                email: newUser.email,
                id: newUser.id,
                userType: "patient",
                name: newUser.name
            }, process.env.JWT_SECRET!)
            
            console.log(6.2);
            
            return NextResponse.json({
                message: "User created successfully",
                token
            }, {
                status: 200
            })
        }

        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", details: error }, { status: 500 });
    }
    
}