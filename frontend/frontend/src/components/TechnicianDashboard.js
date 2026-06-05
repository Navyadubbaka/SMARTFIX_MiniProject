import React, { useCallback, useEffect, useState } from "react";
import API from "../api";
import { io } from "socket.io-client";

function TechnicianDashboard({ user }) {
  const [availableJobs, setAvailableJobs] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [viewMode, setViewMode] = useState("available"); // available or myjobs

  const handleLogout = () => {
    window.location.reload();
  };

  const fetchJobs = useCallback(() => {
    API.get(`/complaints/available/${user._id}`)
      .then((res) => setAvailableJobs(res.data))
      .catch((err) => console.error(err));

    API.get(`/complaints/tech/${user._id}`)
      .then((res) => setMyJobs(res.data))
      .catch((err) => console.error(err));
  }, [user._id]);

  useEffect(() => {
    fetchJobs();

    const socket = io("http://localhost:5000");
    socket.on("complaintUpdated", () => {
      console.log("Real-time update received!");
      fetchJobs();
    });

    return () => socket.disconnect();
  }, [fetchJobs]);

  const acceptJob = async (id) => {
    try {
      await API.put(`/complaints/accept/${id}`, { techId: user._id });
      alert("Job Accepted!");
      fetchJobs();
      setViewMode("myjobs");
    } catch (error) {
      console.error(error);
      alert("Failed to accept job.");
    }
  };

  const startJob = async (id) => {
    try {
      await API.put(`/complaints/start/${id}`);
      alert("Job Started!");
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  const resolveJob = async (id) => {
    const amountStr = window.prompt("Enter the total bill amount (₹):");
    if (!amountStr) return; // User cancelled
    const billAmount = Number(amountStr);
    if (isNaN(billAmount) || billAmount < 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      await API.put(`/complaints/resolve/${id}`, { billAmount });
      alert("Job marked as resolved! Awaiting payment from client.");
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 font-sans">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-xl bg-dark-bg/80 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center border border-brand/30">
            <span className="text-xl font-bold text-brand">⚙️</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
            Tech Portal
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm font-medium text-gray-300">
              Rating: ⭐{user?.rating?.toFixed(1) || 0}
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-sm font-semibold text-brand">
              {user?.name?.charAt(0).toUpperCase() || "T"}
            </div>
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
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
              Technician Dashboard
            </h2>
            <p className="text-gray-400">
              Skill:{" "}
              <span className="text-brand font-semibold capitalize">
                {user?.skill}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("available")}
              className={`px-4 py-2 rounded-lg font-bold border ${viewMode === "available" ? "bg-brand/20 border-brand text-brand" : "bg-dark-bg border-white/10 text-gray-400 hover:border-white/20"}`}
            >
              Open Jobs ({availableJobs.length})
            </button>
            <button
              onClick={() => setViewMode("myjobs")}
              className={`px-4 py-2 rounded-lg font-bold border ${viewMode === "myjobs" ? "bg-brand/20 border-brand text-brand" : "bg-dark-bg border-white/10 text-gray-400 hover:border-white/20"}`}
            >
              My Active Jobs
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewMode === "available" && availableJobs.length === 0 && (
            <p className="text-gray-400 p-6 border border-white/5 rounded-2xl bg-dark-card">
              No open jobs currently matching your skill.
            </p>
          )}
          {viewMode === "myjobs" && myJobs.length === 0 && (
            <p className="text-gray-400 p-6 border border-white/5 rounded-2xl bg-dark-card">
              You don't have any active jobs right now.
            </p>
          )}

          {(viewMode === "available" ? availableJobs : myJobs).map((job) => (
            <div
              key={job._id}
              className="p-6 rounded-3xl bg-dark-card border border-white/5 hover:border-brand/30 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] flex flex-col"
            >
              {job.image && (
                <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={`http://localhost:5000/uploads/${job.image}`}
                    alt="Complaint Issue"
                    className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              )}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase border ${job.status === "Resolved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : job.status === "In Progress" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : job.status === "Accepted" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}
                  >
                    {job.status}
                  </span>
                  {job.priority && (
                    <span
                      className={`px-2 py-1.5 rounded-full text-xs font-bold uppercase border ${job.priority === "High" ? "bg-red-500/10 text-red-500 border-red-500/30" : job.priority === "Medium" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" : "bg-gray-500/10 text-gray-400 border-gray-500/30"}`}
                    >
                      {job.priority} Priority
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1 leading-snug">
                {job.description}
              </h3>
              <p className="text-xs text-brand mb-2">
                Category: {job.category}{" "}
                {job.aiConfidence
                  ? `(${(job.aiConfidence * 100).toFixed(0)}% AI Conf)`
                  : ""}
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Client: {job.userId?.name || "Unknown"}
              </p>

              <div className="mt-auto pt-4 border-t border-white/5">
                {viewMode === "available" && (
                  <button
                    onClick={() => acceptJob(job._id)}
                    disabled={job.status !== "Pending Acceptance"}
                    className="w-full py-3 bg-brand text-dark-bg font-bold rounded-xl hover:-translate-y-0.5 shadow-lg transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {job.status === "Pending Acceptance"
                      ? "Accept Job"
                      : "Already Assigned"}
                  </button>
                )}
                {viewMode === "myjobs" && (
                  <div className="flex gap-2">
                    {job.status === "Accepted" && (
                      <button
                        onClick={() => startJob(job._id)}
                        className="flex-1 py-3 bg-blue-500 text-white font-bold rounded-xl hover:-translate-y-0.5 transition-transform"
                      >
                        Start Work
                      </button>
                    )}
                    {job.status === "In Progress" && (
                      <button
                        onClick={() => resolveJob(job._id)}
                        className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:-translate-y-0.5 transition-transform"
                      >
                        Mark Resolved
                      </button>
                    )}
                    {job.status === "Pending Payment" && (
                      <p className="text-amber-500 font-bold w-full text-center py-2 bg-amber-500/10 rounded-lg">
                        Awaiting payment: ₹{job.billAmount}
                      </p>
                    )}
                    {job.status === "Resolved" && (
                      <div className="w-full text-center space-y-2">
                        {job.isPaid && (
                          <p className="text-emerald-400 font-bold bg-emerald-500/10 py-1 rounded inline-block px-3">
                            Paid: ₹{job.billAmount}
                          </p>
                        )}
                        {job.rating ? (
                          <p className="text-brand font-bold">
                            ⭐ Client rated: {job.rating}/5
                          </p>
                        ) : (
                          <p className="text-gray-500 italic">
                            Awaiting client review
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechnicianDashboard;
