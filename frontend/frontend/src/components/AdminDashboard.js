import React, { useEffect, useState } from "react";
import API from "../api";
import { io } from "socket.io-client";

function AdminDashboard({ user }) {
    const [complaints, setComplaints] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState("complaints");
    const [sortOrder, setSortOrder] = useState("newest"); // "complaints" or "users"
    
    // Add User form state
    const [showAddUser, setShowAddUser] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "user", skill: "carpentry" });
    const [isAdding, setIsAdding] = useState(false);

    const handleLogout = () => {
        window.location.reload(); 
    };

    const fetchComplaints = () => {
        API.get("/complaints/all")
           .then(res => setComplaints(res.data))
           .catch(err => console.error("Failed to fetch complaints", err));
    };

    const fetchUsers = () => {
        API.get("/auth/users")
           .then(res => setUsers(res.data))
           .catch(err => console.error("Failed to fetch users", err));
    };

    useEffect(() => {
        fetchComplaints();
        fetchUsers();

        const socket = io("http://localhost:5000");
        socket.on("complaintUpdated", () => {
            console.log("Real-time update received!");
            fetchComplaints();
        });

        return () => socket.disconnect();
    }, []);

    const handleToggleBlockUser = async (id, currentBlockedStatus) => {
        if (!window.confirm(`Are you sure you want to ${currentBlockedStatus ? "unblock" : "block"} this user/technician?`)) return;
        try {
            await API.put(`/auth/users/${id}/toggle-block`);
            alert(`User ${currentBlockedStatus ? "unblocked" : "blocked"} successfully.`);
            fetchUsers();
        } catch (error) {
            console.error(error);
            alert("Failed to update user status.");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const getTimeDiff = (start, end) => {
        if (!start || !end) return "N/A";
        const diff = Math.floor((new Date(end) - new Date(start)) / 60000); // in minutes
        if (diff < 60) return `${diff} mins`;
        const hours = Math.floor(diff / 60);
        const mins = diff % 60;
        return `${hours}h ${mins}m`;
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        try {
            const payload = { ...newUser };
            if (payload.role !== "technician") delete payload.skill;
            
            await API.post("/auth/register", payload);
            alert("User created successfully");
            setShowAddUser(false);
            setNewUser({ name: "", email: "", password: "", role: "user", skill: "carpentry" });
            fetchUsers();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to add user");
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg text-gray-100 font-sans">
            <div className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-xl bg-dark-bg/80 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center border border-brand/30">
                        <span className="text-xl font-bold text-brand">👑</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">Admin Oversight</h1>
                </div>
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium border border-white/10 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition-colors">
                    Log out
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Network Oversight</h2>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <div className="bg-dark-card border border-white/10 px-4 py-3 rounded-xl shadow-lg">
                                <p className="text-gray-400 text-sm">Total Complaints</p>
                                <p className="text-brand text-2xl font-bold">{complaints.length}</p>
                            </div>
                            <div className="bg-dark-card border border-white/10 px-4 py-3 rounded-xl shadow-lg">
                                <p className="text-gray-400 text-sm">Resolved</p>
                                <p className="text-emerald-400 text-2xl font-bold">{complaints.filter(c => c.status === "Resolved").length}</p>
                            </div>
                            <div className="bg-dark-card border border-white/10 px-4 py-3 rounded-xl shadow-lg">
                                <p className="text-gray-400 text-sm">Active Techs</p>
                                <p className="text-blue-400 text-2xl font-bold">{users.filter(u => u.role === "technician" && u.available && !u.isBlocked).length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setActiveTab("complaints")}
                                className={`px-4 py-2 rounded-lg font-bold border transition-colors ${activeTab === 'complaints' ? 'bg-brand/20 border-brand text-brand' : 'bg-dark-bg border-white/10 text-gray-400 hover:border-white/20'}`}
                            >
                                View Complaints
                            </button>
                            <button 
                                onClick={() => setActiveTab("users")}
                                className={`px-4 py-2 rounded-lg font-bold border transition-colors ${activeTab === 'users' ? 'bg-brand/20 border-brand text-brand' : 'bg-dark-bg border-white/10 text-gray-400 hover:border-white/20'}`}
                            >
                                Manage Users
                            </button>
                        </div>
                        {activeTab === "complaints" && (
                            <select 
                                value={sortOrder} 
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="bg-dark-bg border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand/50"
                            >
                                <option value="newest">Sort: Newer to Older</option>
                                <option value="oldest">Sort: Older to Newer</option>
                            </select>
                        )}
                    </div>
                </div>

                {activeTab === "complaints" && (
                    <div className="overflow-x-auto bg-dark-card border border-white/5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-gray-300 border-b border-white/10">
                                    <th className="p-4 font-semibold text-sm uppercase tracking-wider">Image / Priority</th>
                                    <th className="p-4 font-semibold text-sm uppercase tracking-wider">Client / Tech</th>
                                    <th className="p-4 font-semibold text-sm uppercase tracking-wider">Category</th>
                                    <th className="p-4 font-semibold text-sm uppercase tracking-wider">Timestamps</th>
                                    <th className="p-4 font-semibold text-sm uppercase tracking-wider">Status & Time Taken</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...complaints].sort((a, b) => sortOrder === "newest" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt)).map(c => (
                                    <tr key={c._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4 w-40">
                                            {c.image ? (
                                                <img src={`http://localhost:5000/uploads/${c.image}`} alt="Issue" className="w-full h-20 object-cover rounded-lg border border-white/10 mb-2" />
                                            ) : (
                                                <span className="text-gray-500 text-xs text-center block mb-2">No Image</span>
                                            )}
                                            {c.priority && (
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase border ${c.priority === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/30' : c.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' : 'bg-gray-500/10 text-gray-400 border-gray-500/30'}`}>
                                                    {c.priority} Priority
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-white text-sm">Client: {c.userId?.name || "Unknown"}</p>
                                            <p className="text-xs text-gray-500 mb-2">{c.userId?.email}</p>
                                            <p className="font-bold text-gray-300 text-sm">Tech: {c.technicianId?.name || "Unassigned"}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-xs font-semibold">{c.category}</span>
                                            {c.aiConfidence && <p className="text-xs text-gray-500 mt-2">AI Conf: {(c.aiConfidence * 100).toFixed(0)}%</p>}
                                        </td>
                                        <td className="p-4 text-xs text-gray-400 space-y-1">
                                            <p><span className="text-gray-500 w-16 inline-block">Raised:</span> {formatDate(c.createdAt)}</p>
                                            <p><span className="text-gray-500 w-16 inline-block">Assigned:</span> {formatDate(c.assignedAt)}</p>
                                            <p><span className="text-gray-500 w-16 inline-block">Resolved:</span> {formatDate(c.resolvedAt)}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-sm font-bold block mb-2 ${c.status === "Pending Payment" ? "text-amber-500" : "text-brand"}`}>{c.status}</span>
                                            {c.billAmount !== null && c.billAmount > 0 && (
                                                 <span className={`text-xs px-2 py-1 flex w-fit rounded shadow-inner mb-2 border ${c.isPaid ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 border-white/10 text-white'}`}>
                                                     Bill: ₹{c.billAmount} {c.isPaid && " (Paid)"}
                                                 </span>
                                            )}
                                            {c.status === "Resolved" && (
                                                <span className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300 shadow-inner">
                                                    Took {getTimeDiff(c.assignedAt, c.resolvedAt)}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "users" && (
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <button onClick={() => setShowAddUser(!showAddUser)} className="px-6 py-2 bg-brand text-dark-bg font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-transform">
                                {showAddUser ? "Cancel" : "+ Add New User / Tech"}
                            </button>
                        </div>

                        {showAddUser && (
                            <form onSubmit={handleAddUser} className="bg-dark-card p-6 rounded-3xl border border-white/10 grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-400 ml-1">Name</label>
                                    <input required type="text" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="w-full mt-1 bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white" />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 ml-1">Email</label>
                                    <input required type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full mt-1 bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white" />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 ml-1">Password</label>
                                    <input required type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} className="w-full mt-1 bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="text-sm text-gray-400 ml-1">Role</label>
                                        <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="w-full mt-1 bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white">
                                            <option value="user">User</option>
                                            <option value="technician">Technician</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    {newUser.role === "technician" && (
                                        <div className="flex-1">
                                            <label className="text-sm text-gray-400 ml-1">Skill</label>
                                            <select value={newUser.skill} onChange={e => setNewUser({...newUser, skill: e.target.value})} className="w-full mt-1 bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white">
                                                <option value="carpentry">Carpentry</option>
                                                <option value="electrical">Electrical</option>
                                                <option value="plumbing">Plumbing</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                                <div className="md:col-span-2 mt-2">
                                    <button type="submit" disabled={isAdding} className="w-full py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                        {isAdding ? "Saving..." : "Save User"}
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="overflow-x-auto bg-dark-card border border-white/5 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-gray-300 border-b border-white/10">
                                        <th className="p-4 font-semibold text-sm uppercase tracking-wider">Name & Status</th>
                                        <th className="p-4 font-semibold text-sm uppercase tracking-wider">Email</th>
                                        <th className="p-4 font-semibold text-sm uppercase tracking-wider">Role</th>
                                        <th className="p-4 font-semibold text-sm uppercase tracking-wider">Extra Info</th>
                                        <th className="p-4 font-semibold text-sm uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u._id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${u.isBlocked ? 'opacity-60' : ''}`}>
                                            <td className="p-4">
                                                <p className="font-bold text-white">{u.name}</p>
                                                {u.isBlocked && <span className="text-xs font-bold text-red-500">BLOCKED</span>}
                                            </td>
                                            <td className="p-4 text-gray-400">{u.email}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${u.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : u.role === 'technician' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-500">
                                                {u.role === "technician" ? `Skill: ${u.skill} | Rating: ⭐${u.rating?.toFixed(1) || 0}` : "N/A"}
                                            </td>
                                            <td className="p-4">
                                                {u.role !== 'admin' && (
                                                    <button onClick={() => handleToggleBlockUser(u._id, u.isBlocked)} className={`px-3 py-1 text-sm font-bold border rounded transition-colors ${u.isBlocked ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'}`}>
                                                        {u.isBlocked ? 'Unblock' : 'Block'}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
