
"use client"
import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import {useRouter}from 'next/navigation';



const page = () => {


    const [isDoctor, setIsDoctor] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            if(loading) return;
            setLoading(true);
            e.preventDefault();
            // Handle form submission
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({ name, email, password, userType: isDoctor ? "doctor" : "patient" }),
            })
            const data = await res.json();
            console.log(data);
            
            if (res.ok) {
                localStorage.setItem("authToken", data.token);
                router.push("/dashboard");
            } else {
                setError(data.error || "Sign up failed");
                console.error("Sign up failed:", data.error);
            }
            
        } catch (error) {
            console.error("Error during sign up:", error);
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-500 text-white flex flex-col">
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-slate-400 rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
                    <h2 className="text-3xl font-light text-gray-800 mb-2 text-center">Create your account</h2>
                    <p className="text-gray-400 text-center mb-8">Join and start your Ayurvedic journey</p>
                    <div className="flex justify-center mb-6 gap-4">
                        <Button variant={isDoctor ? "primary" : "secondary"} size="md" onClick={() => setIsDoctor(true)} >Doctor</Button>
                        <Button variant={!isDoctor ? "primary" : "secondary"} size="md" onClick={() => setIsDoctor(false)} >Patient</Button>
                    </div>
                    <div className="space-y-6">
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <Input label="Name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <Input label="Email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 text-gray-900 px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-600 cursor-pointer transition-colors"
                        >
                        {
                            loading ? "Creating Account..." : "Sign Up"
                        }
                        </button>
                    </div>
                    <div className="mt-8 text-center">
                        <span className="text-gray-800">Already have an account?</span>{" "}
                        <a href="/auth/signin" className="text-blue-600 hover:underline">
                        Sign In
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}   



export default page;

