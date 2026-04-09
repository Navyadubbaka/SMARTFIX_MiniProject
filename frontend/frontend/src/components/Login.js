import React, { useState } from "react";
import API from "../api";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await API.post("/auth/login", { email, password });
            setUser(res.data.user);
            alert("Login successful");
        } catch (error) {
            console.error("Login failed", error);
            const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg text-gray-100 font-sans selection:bg-brand selection:text-black flex items-center justify-center relative px-4">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-brand/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="relative z-10 w-full max-w-md p-8 sm:p-10 bg-dark-card border border-white/5 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(213,231,181,0.15)]">
                        <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-400">Log in to manage your facility.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="admin@smartfix.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all font-medium"
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all font-medium"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-brand text-dark-bg font-bold text-lg rounded-xl px-4 py-4 mt-4 shadow-[0_0_20px_rgba(213,231,181,0.2)] hover:shadow-[0_0_30px_rgba(213,231,181,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;