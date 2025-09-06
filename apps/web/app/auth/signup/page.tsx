
"use client"
import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";



const page = () => {


    const [isDoctor, setIsDoctor] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
                    <h2 className="text-3xl font-light text-white mb-2 text-center">Create your account</h2>
                    <p className="text-gray-400 text-center mb-8">Join and start your Ayurvedic journey</p>
                    <div className="flex justify-center mb-6 gap-4">
                        <Button variant={isDoctor ? "primary" : "secondary"} size="md" onClick={() => setIsDoctor(true)} >Doctor</Button>
                        <Button variant={!isDoctor ? "primary" : "secondary"} size="md" onClick={() => setIsDoctor(false)} >Patient</Button>
                    </div>
                    <div className="space-y-6">
                        <Input label="Name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
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
                        <span className="text-gray-400">Already have an account?</span>{" "}
                        <a href="/auth/signin" className="text-green-400 hover:underline">
                        Sign In
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}   



export default page;

