"use client"
import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";



const page = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
                    <h2 className="text-3xl font-light text-white mb-2 text-center">Sign In</h2>
                    <p className="text-gray-400 text-center mb-8">Please enter your credentials</p>
                    <div className="space-y-6">
                        <Input label="Email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button
                        type="submit"
                        className="w-full bg-green-500 text-gray-900 px-6 py-3 rounded-full text-lg font-medium hover:bg-green-400 transition-colors"
                        >
                        Sign In
                        </button>
                    </div>
                    <div className="mt-8 text-center">
                        <span className="text-gray-400">Don't have an account?</span>{" "}
                        <a href="/auth/signup" className="text-green-400 hover:underline">
                        Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}   



export default page;