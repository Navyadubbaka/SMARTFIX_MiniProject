import React, { useCallback, useEffect, useState } from "react";
import API from "../api";
import { io } from "socket.io-client";

function ViewComplaints({ user, setPage }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(null);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    API.get(`/complaints/user/${user._id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch complaints", err))
      .finally(() => setIsLoading(false));
  }, [user._id]);

  useEffect(() => {
    fetchData();

    const socket = io("http://localhost:5000");
    socket.on("complaintUpdated", () => {
      console.log("Real-time update received!");
      fetchData();
    });

    return () => socket.disconnect();
  }, [fetchData]);

  const submitReview = async (id) => {
    const rating = prompt("Please rate the technician's work (1 to 5 stars):");
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      alert("Please enter a valid number between 1 and 5.");
      return;
    }

    const reviewText = prompt("Any additional comments? (Optional)");

    try {
      await API.put(`/complaints/rate/${id}`, {
        rating: Number(rating),
        reviewText: reviewText || "",
      });
      alert("Thank you for your review!");
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to submit review.");
    }
  };

  const handlePayment = async (c) => {
    setIsPaying(c._id);
    // Simulate a secure dummy payment gateway process
    setTimeout(async () => {
      try {
        await API.put(`/complaints/pay/${c._id}`);
        alert(
          `Successfully paid ₹${c.billAmount} to ${c.technicianId?.name || "Technician"}.`,
        );
        fetchData();
      } catch (error) {
        console.error(error);
        alert("Payment simulation failed.");
      } finally {
        setIsPaying(null);
      }
    }, 1500);
  };

  const getStatusStyles = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("resolv") || s.includes("clos"))
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (s.includes("prog") || s.includes("assign") || s.includes("accept"))
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    if (s.includes("open") || s.includes("pend"))
      return "bg-brand/10 text-brand border-brand/20";
    return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 font-sans selection:bg-brand selection:text-black">
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-brand/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-xl bg-dark-bg/80 border-b border-white/5">
        <button
          onClick={() => setPage?.("dashboard")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-medium">Dashboard</span>
        </button>
        <div className="hidden sm:block text-sm font-medium text-gray-500">
          Complaints History
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
              Your Complaints
            </h2>
            <p className="text-gray-400">
              Track and monitor the status of your reported issues.
            </p>
          </div>
          <button
            onClick={() => setPage?.("raise")}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand/50"
          >
            + New Complaint
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 animate-pulse">
              Loading amazing things...
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-24 bg-dark-card border border-white/5 rounded-[2rem]">
            <h3 className="text-2xl font-semibold text-white mb-2">
              No Complaints Found
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Looks like everything is running smoothly. If you spot an issue,
              don't hesitate to report it!
            </p>
            <button
              onClick={() => setPage?.("raise")}
              className="px-8 py-3 bg-brand text-dark-bg font-bold rounded-xl hover:-translate-y-0.5 shadow-lg transition-all"
            >
              Raise a Complaint
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((c) => (
              <div
                key={c._id}
                className="group p-6 rounded-3xl bg-dark-card border border-white/5 hover:border-brand/30 transition-all duration-300 shadow-md flex flex-col"
              >
                {c.image && (
                  <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={`http://localhost:5000/uploads/${c.image}`}
                      alt="Complaint Issue"
                      className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusStyles(c.status)}`}
                    >
                      {c.status || "Open"}
                    </span>
                    {c.priority && (
                      <span
                        className={`px-2 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${c.priority === "High" ? "bg-red-500/10 text-red-500 border-red-500/30" : c.priority === "Medium" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" : "bg-gray-500/10 text-gray-400 border-gray-500/30"}`}
                      >
                        {c.priority} Prior.
                      </span>
                    )}
                  </div>
                  {c.category && (
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-400 border border-white/5">
                      {c.category}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-white mb-1 leading-snug break-words">
                  {c.description
                    ? c.description.length > 80
                      ? c.description.substring(0, 80) + "..."
                      : c.description
                    : "No description provided"}
                </h3>

                <div className="text-sm text-gray-400 my-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  {c.technicianId ? (
                    <div>
                      <p>
                        Assigned to{" "}
                        <span className="text-white font-bold">
                          {c.technicianId.name}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1 capitalize">
                        {c.technicianId.skill} Speciality | Rating: ⭐
                        {(c.technicianId.rating || 0).toFixed(1)}
                      </p>
                      {c.technicianId.phone && c.status !== "Resolved" && (
                        <a
                          href={`tel:${c.technicianId.phone}`}
                          className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold hover:bg-emerald-500/20 transition-colors"
                        >
                          📞 Call {c.technicianId.phone}
                        </a>
                      )}
                    </div>
                  ) : (
                    <p>Searching for nearby Technician...</p>
                  )}
                </div>
                <div className="mb-4 space-y-1 text-xs text-gray-500 border-t border-white/5 pt-3">
                  <p>Raised: {formatDate(c.createdAt)}</p>
                  {c.assignedAt && <p>Assigned: {formatDate(c.assignedAt)}</p>}
                  {c.resolvedAt && <p>Resolved: {formatDate(c.resolvedAt)}</p>}
                  {c.billAmount !== null && c.billAmount > 0 && c.isPaid && (
                    <p className="mt-2 inline-block px-2 py-1 bg-green-500/10 text-green-400 font-bold border border-green-500/30 rounded">
                      Paid: ₹{c.billAmount}
                    </p>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  {c.status === "Pending Payment" ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-brand/10 border border-brand/20 w-full py-2 text-center rounded-lg">
                        <p className="text-xs text-brand uppercase tracking-wider font-bold mb-0.5">
                          Total Amount Due
                        </p>
                        <p className="text-xl font-bold text-white">
                          ₹{c.billAmount}
                        </p>
                      </div>
                      <button
                        onClick={() => handlePayment(c)}
                        disabled={isPaying === c._id}
                        className="w-full py-2.5 bg-brand text-dark-bg font-bold rounded-xl hover:-translate-y-0.5 shadow-lg transition-transform disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                      >
                        {isPaying === c._id
                          ? "Processing Payment..."
                          : "💳 Pay Securely"}
                      </button>
                    </div>
                  ) : c.status === "Resolved" && !c.rating ? (
                    <button
                      onClick={() => submitReview(c._id)}
                      className="w-full py-2 bg-brand/10 text-brand border border-brand/20 font-bold rounded-xl hover:bg-brand/20 transition-all"
                    >
                      ⭐ Leave a Review
                    </button>
                  ) : c.status === "Resolved" && c.rating ? (
                    <p className="text-brand font-bold text-center">
                      You rated: ⭐ {c.rating}/5
                    </p>
                  ) : (
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Tracking Live
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewComplaints;
