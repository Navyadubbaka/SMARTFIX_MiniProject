import React from "react";
import AdminDashboard from "./AdminDashboard";
import TechnicianDashboard from "./TechnicianDashboard";
import UserDashboard from "./UserDashboard";

function Dashboard({ user, setPage }) {
    if (user?.role === "admin") {
        return <AdminDashboard user={user} setPage={setPage} />;
    }
    if (user?.role === "technician") {
        return <TechnicianDashboard user={user} setPage={setPage} />;
    }
    
    // Default to User Dashboard
    return <UserDashboard user={user} setPage={setPage} />;
}

export default Dashboard;