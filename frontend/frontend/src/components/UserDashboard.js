import React from "react";

function UserDashboard({ user, setPage }) {
    const handleLogout = () => {
        window.location.reload(); 
    };

    return (
        <div className="min-h-screen bg-dark-bg text-gray-100 font-sans selection:bg-brand selection:text-black">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

            {/* Top Navigation */}
            <div className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-xl bg-dark-bg/80 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center border border-brand/30">
                        <svg className="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">SmartFix Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-sm font-semibold text-brand">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <span className="text-sm font-medium text-gray-300">{user?.name}</span>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium border border-white/10 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                    >
                        Log out
                    </button>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald-300">{user?.name?.split(' ')[0] || 'User'}</span>
                    </h2>
                    <p className="text-lg text-gray-400">What would you like to do today?</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Action 1: Raise Complaint */}
                    <button 
                        onClick={() => setPage("raise")}
                        className="group text-left p-8 rounded-[2rem] bg-gradient-to-br from-dark-card to-[#0d1320] border border-white/10 hover:border-brand/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(213,231,181,0.2)] relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 w-40 h-40 bg-brand/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand transition-all duration-300">
                            <svg className="w-8 h-8 text-brand group-hover:text-dark-bg transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand transition-colors">Raise an Issue</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Report a new maintenance problem. Upload an image and let our AI handle the rest.
                        </p>
                    </button>

                    {/* Action 2: View Complaints */}
                    <button 
                        onClick={() => setPage("view")}
                        className="group text-left p-8 rounded-[2rem] bg-gradient-to-br from-dark-card to-[#0d1320] border border-white/10 hover:border-brand/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(213,231,181,0.2)] relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 w-40 h-40 bg-brand/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand transition-all duration-300">
                            <svg className="w-8 h-8 text-brand group-hover:text-dark-bg transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand transition-colors">Track Progress</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            View the status of your reported issues and monitor technician assignments in real-time.
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
