"use client"
import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useRouter } from "next/navigation";



const page = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent) => {
        try {
            if(loading) return;
            setLoading(true);
            e.preventDefault();
            // Handle form submission
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json();
            console.log(data);
            
            if (res.ok) {
                localStorage.setItem("authToken", data.token);
                router.push("/dashboard");
            } else {
                console.error("Sign in failed:", data.message);
            }
            
        } catch (error) {
            console.error("Error during sign in:", error);
        }
        finally{
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-slate-500 text-white flex flex-col">
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-slate-400 rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
                    <h2 className="text-3xl font-light text-gray-800 mb-2 text-center">Sign In</h2>
                    <p className="text-gray-600 text-center mb-8">Please enter your credentials</p>
                    <div className="space-y-6">
                        <Input label="Email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 text-gray-900 px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-600 cursor-pointer transition-colors"
                        >
                        {
                            loading ? "Signing In..." : "Sign In"
                        }
                        </button>
                    </div>
                    <div className="mt-8 text-center">
                        <span className="text-gray-800">Don't have an account?</span>{" "}
                        <a href="/auth/signup" className="text-blue-600 hover:underline">
                        Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}   



export default page;