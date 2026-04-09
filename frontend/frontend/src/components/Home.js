import React from "react";

function Home({ setPage }) {
    return (
        <div className="min-h-screen bg-dark-bg text-gray-100 font-sans selection:bg-brand selection:text-black">
            
            {/* BACKGROUND GLOW EFFECTS */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-brand/10 blur-[150px] rounded-[100%] pointer-events-none z-0"></div>

            {/* NAVBAR */}
            <div className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-16 py-4 backdrop-blur-xl bg-dark-bg/70 border-b border-white/5">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
                    <div className="w-10 h-10 rounded-2xl bg-brand flex items-center justify-center shadow-[0_0_20px_rgba(213,231,181,0.4)]">
                        <svg className="w-6 h-6 text-dark-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white hidden sm:block">SmartFix</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setPage("login")}
                        className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
                        Log in
                    </button>
                    <button 
                        onClick={() => setPage("register")}
                        className="px-6 py-2.5 text-sm font-semibold bg-brand text-dark-bg rounded-full hover:bg-brand-dark transition-all shadow-[0_4px_14px_rgba(213,231,181,0.25)] hover:shadow-[0_6px_20px_rgba(213,231,181,0.4)] hover:-translate-y-0.5"
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            {/* HERO SECTION */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 overflow-hidden">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand text-sm font-medium mb-8 backdrop-blur-sm cursor-default hover:bg-white/10 transition-colors">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand"></span>
                    </span>
                    Intelligent Maintenance is Here
                </div>

                <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-5xl leading-[1.15]">
                    Fix Issues Faster with <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald-400">Automated Intelligence</span>
                </h2>

                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
                    SmartFix automatically detects problems via images, categorizes them, and assigns the best technician instantly. Say goodbye to manual ticketing pipelines.
                </p>

                <div className="flex flex-col sm:flex-row gap-5">
                    <button 
                        onClick={() => setPage("register")}
                        className="px-8 py-4 bg-brand text-dark-bg rounded-full text-lg font-semibold hover:bg-brand-dark transition-all shadow-[0_0_25px_rgba(213,231,181,0.3)] hover:shadow-[0_0_45px_rgba(213,231,181,0.5)] hover:-translate-y-1"
                    >
                        Get Started Free
                    </button>
                    <button 
                        onClick={() => setPage("login")}
                        className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full text-lg font-semibold hover:bg-white/10 transition-all hover:-translate-y-1"
                    >
                        View Demo
                    </button>
                </div>
            </div>

            {/* FEATURES SECTION */}
            <div className="px-6 md:px-16 py-24 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-dark-bg/50">
                <div className="text-center mb-20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-brand/5 blur-[80px] rounded-full pointer-events-none"></div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">Why Choose SmartFix?</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">Our platform uses cutting-edge AI visual models to streamline your entire maintenance workflow from start to finish.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className="group p-8 rounded-[2rem] bg-dark-card border border-white/5 hover:border-brand/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_50px_-15px_rgba(213,231,181,0.2)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 w-32 h-32 bg-brand/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand/20 transition-all duration-300">
                            <svg className="w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-brand transition-colors">AI Detection</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Simply take a photo of the issue. Our advanced machine learning models instantly identify the problem type and severity.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group p-8 rounded-[2rem] bg-dark-card border border-white/5 hover:border-brand/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_50px_-15px_rgba(213,231,181,0.2)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 w-32 h-32 bg-brand/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand/20 transition-all duration-300">
                            <svg className="w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-brand transition-colors">Smart Routing</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Automatically assigns tasks to the most qualified, available technician in the vicinity, eliminating manual dispatcher delays.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group p-8 rounded-[2rem] bg-dark-card border border-white/5 hover:border-brand/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_50px_-15px_rgba(213,231,181,0.2)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 w-32 h-32 bg-brand/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand/20 transition-all duration-300">
                            <svg className="w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-brand transition-colors">Live Tracking</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Keep residents and managers in the loop with real-time status updates from Open to Resolved, transparently.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA SECTION */}
            <div className="px-6 md:px-16 py-24 relative z-10">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-dark-card to-[#0d1320] border border-white/10 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">Ready to upgrade?</h2>
                        <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">Join hundreds of property managers and facility teams who are already saving hours every week with SmartFix.</p>
                        <button 
                            onClick={() => setPage("register")}
                            className="px-10 py-5 bg-white text-black rounded-full text-lg font-bold hover:bg-brand hover:text-dark-bg transition-colors shadow-xl hover:-translate-y-1"
                        >
                            Create an Account
                        </button>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="border-t border-white/5 mt-10 px-6 py-10 text-center bg-dark-bg relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-lg bg-brand flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-dark-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="font-bold text-white tracking-wide">SmartFix</span>
                </div>
                <p className="text-gray-500 text-sm">© 2026 SmartFix Inc. All rights reserved.</p>
            </div>

        </div>
    );
}

export default Home;