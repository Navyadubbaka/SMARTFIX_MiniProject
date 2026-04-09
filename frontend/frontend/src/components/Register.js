import React, { useState } from "react";
import API from "../api";

function Register({ setPage }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("user");
    const [skill, setSkill] = useState("carpentry"); // Default option for technicians
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const payload = {
                name,
                email,
                password,
                phone,
                role
            };
            
            if (role === "technician") {
                payload.skill = skill;
            }

            await API.post("/auth/register", payload);
            alert("Registered successfully! You can now log in.");
            setPage("login");
        } catch (error) {
            console.error("Registration failed", error);
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg text-gray-100 font-sans selection:bg-brand selection:text-black flex items-center justify-center relative px-4">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-brand/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="relative z-10 w-full max-w-md p-8 sm:p-10 bg-dark-card border border-white/5 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] my-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(213,231,181,0.15)]">
                        <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Create Account</h2>
                    <p className="text-gray-400">Join the smart maintenance platform.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    
                    {/* Role Selection */}
                    <div className="grid grid-cols-3 gap-2 mb-2">
                        <button 
                            type="button"
                            onClick={() => setRole("user")}
                            className={`py-3 px-2 rounded-xl border transition-all text-xs sm:text-sm font-bold ${role === "user" ? "bg-brand/10 border-brand text-brand shadow-[0_0_15px_rgba(213,231,181,0.2)]" : "bg-dark-bg/50 border-white/5 text-gray-400 hover:border-white/20"}`}
                        >
                            User
                        </button>
                        <button 
                            type="button"
                            onClick={() => setRole("technician")}
                            className={`py-3 px-2 rounded-xl border transition-all text-xs sm:text-sm font-bold ${role === "technician" ? "bg-brand/10 border-brand text-brand shadow-[0_0_15px_rgba(213,231,181,0.2)]" : "bg-dark-bg/50 border-white/5 text-gray-400 hover:border-white/20"}`}
                        >
                            Technician
                        </button>
                        <button 
                            type="button"
                            onClick={() => setRole("admin")}
                            className={`py-3 px-2 rounded-xl border transition-all text-xs sm:text-sm font-bold ${role === "admin" ? "bg-brand/10 border-brand text-brand shadow-[0_0_15px_rgba(213,231,181,0.2)]" : "bg-dark-bg/50 border-white/5 text-gray-400 hover:border-white/20"}`}
                        >
                            Admin
                        </button>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                        <input 
                            type="text" 
                            placeholder="John Doe" 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all font-medium"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="user@smartfix.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all font-medium"
                            required
                        />
                    </div>
                    
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300 ml-1">Phone Number</label>
                        <input 
                            type="tel" 
                            placeholder="+1 (555) 000-0000" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} 
                            className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all font-medium"
                            required
                        />
                    </div>
                    
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all font-medium"
                            required
                        />
                    </div>

                    {/* Skill dropdown for Technicians */}
                    {role === "technician" && (
                        <div className="space-y-1.5 animate-fadeIn">
                            <label className="text-sm font-medium text-gray-300 ml-1">Specialized Skill</label>
                            <select 
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all font-medium appearance-none"
                            >
                                <option value="carpentry">Carpentry</option>
                                <option value="electrical">Electrical</option>
                                <option value="plumbing">Plumbing</option>
                            </select>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-brand text-dark-bg font-bold text-lg rounded-xl px-4 py-4 mt-8 shadow-[0_0_20px_rgba(213,231,181,0.2)] hover:shadow-[0_0_30px_rgba(213,231,181,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                        {isLoading ? "Creating Account..." : "Register Account"}
                    </button>
                    
                    <div className="text-center pt-4">
                        <p className="text-sm text-gray-400">
                            Already have an account?{' '}
                            <button 
                                type="button" 
                                onClick={() => setPage("login")} 
                                className="text-brand hover:text-white transition-colors font-semibold"
                            >
                                Log in
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;