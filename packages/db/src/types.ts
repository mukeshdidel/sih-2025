import { Prisma } from "@prisma/client";


export type DoctorPatientType = Prisma.DoctorPatientGetPayload<{
    include: {
        patient: {
            select: {
                name: true,
                email: true,
                id: true
            }
        },
        PatientDosha: {
            include: {
                dosha: true
            }
        }
    }
}>;