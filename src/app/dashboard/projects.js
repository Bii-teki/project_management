"use client";

import { useState } from "react";
import { FiCalendar, FiHome, FiSettings, FiPlus, FiClock, FiMapPin, FiDollarSign, FiUser } from "react-icons/fi";

export default function Events() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState({
    name: "",
    location: "",
    address: "",
    fundi: "",
    budget: ""
  });


  const handleProjectSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Project submitted:", projectForm);
    setShowProjectModal(false);
    // Reset form
    setProjectForm({
      name: "",
      location: "",
      address: "",
      fundi: "",
      budget: ""
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* ... (your existing sidebar code remains the same) ... */}

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-base-content">Events</h1>
          <button 
            className="btn btn-primary gap-2"
            onClick={() => setShowProjectModal(true)}
          >
            <FiPlus />
            New Project
          </button>
        </div>

        {/* ... (your existing tabs and events list code remains the same) ... */}

        {/* Project Modal */}
        {showProjectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">Add New Project</h2>
              
              <form onSubmit={handleProjectSubmit}>
                <div className="space-y-4">
                  {/* Name Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Project Name</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter project name"
                        className="input input-bordered w-full pl-10"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                        required
                      />
                      <FiHome className="absolute left-3 top-3 text-base-content/70" />
                    </div>
                  </div>

                  {/* Location Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Location</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter location"
                        className="input input-bordered w-full pl-10"
                        value={projectForm.location}
                        onChange={(e) => setProjectForm({...projectForm, location: e.target.value})}
                        required
                      />
                      <FiMapPin className="absolute left-3 top-3 text-base-content/70" />
                    </div>
                  </div>

                  {/* Address Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Address</span>
                    </label>
                    <textarea
                      placeholder="Enter full address"
                      className="textarea textarea-bordered w-full"
                      value={projectForm.address}
                      onChange={(e) => setProjectForm({...projectForm, address: e.target.value})}
                      required
                    />
                  </div>

                  {/* Fundi Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Fundi/Contractor</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter fundi/contractor name"
                        className="input input-bordered w-full pl-10"
                        value={projectForm.fundi}
                        onChange={(e) => setProjectForm({...projectForm, fundi: e.target.value})}
                        required
                      />
                      <FiUser className="absolute left-3 top-3 text-base-content/70" />
                    </div>
                  </div>

                  {/* Budget Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Budget</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Enter budget amount"
                        className="input input-bordered w-full pl-10"
                        value={projectForm.budget}
                        onChange={(e) => setProjectForm({...projectForm, budget: e.target.value})}
                        required
                      />
                      <FiDollarSign className="absolute left-3 top-3 text-base-content/70" />
                    </div>
                  </div>
                </div>

                <div className="modal-action mt-6">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setShowProjectModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}