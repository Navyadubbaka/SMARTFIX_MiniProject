import React, { useState } from "react";
import API from "../api";

function RaiseComplaint({ user, setPage }) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!image) {
      setSubmitError("Please provide an image of the issue.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", image);
      formData.append("userId", user._id);

      await API.post("/complaints/create", formData);
      alert(
        "Complaint submitted successfully and is awaiting Technician acceptance!",
      );
      setPage("dashboard");
    } catch (error) {
      console.error("Submission failed", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit. Try again.";
      if (error.response?.data?.error === "AI Unsure") {
        setSubmitError(`AI Classification Failed: ${errorMessage}`);
      } else {
        setSubmitError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 font-sans selection:bg-brand selection:text-black">
      {/* Background Effects */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Top Navigation */}
      <div className="sticky top-0 z-50 flex items-center px-6 md:px-12 py-4 backdrop-blur-xl bg-dark-bg/80 border-b border-white/5">
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
          <span className="font-medium">Back to Dashboard</span>
        </button>
      </div>

      {/* Main Form */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
            Raise a Complaint
          </h2>
          <p className="text-gray-400">
            Provide details and snap a photo of the issue so our AI can help
            classify it.
          </p>
        </div>

        <div className="p-8 sm:p-10 bg-dark-card border border-white/5 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* File Upload Field */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 ml-1">
                Upload Issue Image
              </label>
              <div className="w-full flex-col relative border-2 border-dashed border-white/10 rounded-2xl p-10 flex items-center justify-center hover:border-brand/40 bg-dark-bg/30 transition-all group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand/10 transition-all">
                  <svg
                    className="w-8 h-8 text-gray-400 group-hover:text-brand transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-brand font-semibold mb-1">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-sm text-gray-500">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                  {image && (
                    <p className="mt-4 text-white font-medium bg-white/10 px-4 py-2 rounded-full inline-block truncate max-w-[250px]">
                      Selected: {image.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Description field */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 ml-1">
                Issue Description (Optional)
              </label>
              <textarea
                placeholder="(Optional) Describe the problem in detail (e.g. Broken pipe leaking in hallway B)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand text-dark-bg font-bold text-lg rounded-xl px-4 py-4 shadow-[0_0_20px_rgba(213,231,181,0.2)] hover:shadow-[0_0_30px_rgba(213,231,181,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isSubmitting ? "Submitting securely..." : "Submit Complaint"}
            </button>

            {submitError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-amber-50 text-sm mt-4 leading-relaxed animate-fade-in-up flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <p>{submitError}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RaiseComplaint;
