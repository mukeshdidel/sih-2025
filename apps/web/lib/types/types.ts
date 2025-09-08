export interface User {
    name: string;
    email: string;
    id: string;
    userType: "doctor" | "patient";
}