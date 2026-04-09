import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import RaiseComplaint from "./components/RaiseComplaint";
import ViewComplaints from "./components/ViewComplaints";

function App() {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState("home");
    const [toast, setToast] = useState(null); // { message, type }

    useEffect(() => {
        const socket = io("http://localhost:5000");
        socket.on("complaintUpdated", (data) => {
            if (data?.message) {
                setToast({ message: data.message, type: data.status === "Resolved" ? "success" : "info" });
                setTimeout(() => setToast(null), 5000);
            }
        });
        return () => socket.disconnect();
    }, []);

    const ToastComponent = () => {
        if (!toast) return null;
        return (
            <div className="fixed bottom-6 right-6 z-[1000] animate-fade-in-up">
                <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${toast.type === "success" ? "bg-emerald-900/90 border-emerald-500/50 text-emerald-100" : "bg-dark-card border-brand/50 text-white"}`}>
                    {toast.type === "success" ? (
                        <span className="text-2xl">✅</span>
                    ) : (
                        <span className="text-2xl">🔔</span>
                    )}
                    <span className="font-semibold text-lg">{toast.message}</span>
                </div>
            </div>
        );
    };

    const renderPage = () => {
        if (!user) {
            if (page === "login") return <Login setUser={setUser} />;
            if (page === "register") return <Register setPage={setPage} />;
            return <Home setPage={setPage} />;
        }

        if (page === "raise") return <RaiseComplaint user={user} setPage={setPage} />;
        if (page === "view") return <ViewComplaints user={user} setPage={setPage} />;

        return <Dashboard user={user} setPage={setPage} />;
    };

    return (
        <>
            {renderPage()}
            <ToastComponent />
        </>
    );
}

export default App;