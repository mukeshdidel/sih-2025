import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "../../../../lib/types/zod";
import { prisma } from "@repo/db/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const result = loginSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: "invalid inputs" }, { status: 400 });
        }

        const { email, password } = result.data;

        const existingDoc = await prisma.doctor.findUnique({ where: { email } });
        const existingPatient = await prisma.patient.findUnique({ where: { email } });

        if (!existingDoc && !existingPatient) {
            return NextResponse.json({ error: "Email does not exist" }, { status: 404 });
        }

        if (existingDoc) {
            const isValid = await bcrypt.compare(password, existingDoc.password);
            if (!isValid) {
                return NextResponse.json({ error: "Invalid password" }, { status: 401 });
            }

            const token = jwt.sign(
                {
                    email: existingDoc.email,
                    id: existingDoc.id,
                    userType: "doctor",
                    name: existingDoc.name,
                },
                process.env.JWT_SECRET!
            );

            return NextResponse.json(
                {
                    message: "Login successful",
                    token,
                },
                {
                    status: 200,
                }
            );
        }

        if (existingPatient) {
            const isValid = await bcrypt.compare(password, existingPatient.password);
            if (!isValid) {
                return NextResponse.json({ error: "Invalid password" }, { status: 401 });
            }

            const token = jwt.sign(
                {
                    email: existingPatient.email,
                    id: existingPatient.id,
                    userType: "patient",
                    name: existingPatient.name,
                },
                process.env.JWT_SECRET!
            );

            return NextResponse.json(
                {
                    message: "Login successful",
                    token,
                },
                {
                    status: 200,
                }
            );
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}