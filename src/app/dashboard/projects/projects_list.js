import { useState } from "react";
import { FiPlus, FiFolder, FiClock, FiCalendar, FiX, FiInfo } from "react-icons/fi";
import { dummyProjects } from "../../dashboard/projects/projects";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("active");
  const [projects, setProjects] = useState(dummyProjects);
  const [showAdd, setShowAdd] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "planning"
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const id = Date.now();
    setProjects({
      ...projects,
      active: [...projects.active, { ...newProject, id }],
    });
    setNewProject({ title: "", description: "", startDate: "", endDate: "", status: "planning" });
    setShowAdd(false);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      planning: { color: "bg-blue-100 text-blue-800", label: "Planning" },
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      onHold: { color: "bg-yellow-100 text-yellow-800", label: "On Hold" },
      completed: { color: "bg-purple-100 text-purple-800", label: "Completed" }
    };
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${statusMap[status]?.color || "bg-gray-100 text-gray-800"}`}>
        {statusMap[status]?.label || status}
      </span>
    );
  };

  return (
    <main className="flex-1 p-6 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Project Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage all your construction projects</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="btn btn-primary gap-2 min-w-[180px] hover:shadow-md transition-all"
        >
          <FiPlus className="text-lg" />
          New Project
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          className={`px-4 py-3 font-medium text-sm relative transition-colors duration-200 flex items-center ${activeTab === "active"
            ? "text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          onClick={() => setActiveTab("active")}
        >
          Active Projects
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
            {projects.active.length}
          </span>
        </button>
        <button
          className={`px-4 py-3 font-medium text-sm relative transition-colors duration-200 flex items-center ${activeTab === "archived"
            ? "text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          onClick={() => setActiveTab("archived")}
        >
          Archived Projects
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {projects.archived.length}
          </span>
        </button>
      </div>

      {/* Empty State */}
      {projects[activeTab].length === 0 ? (
        <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-5 mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <FiClock className="text-2xl text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400">Get started by creating your first project</p>
            </div>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="btn btn-primary gap-2 hover:shadow-md transition-all"
          >
            <FiPlus />
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid gap-5">
          {projects[activeTab].map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg flex-shrink-0">
                    <FiFolder className="text-blue-600 dark:text-blue-400 text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {project.title}
                      </h2>
                      {getStatusBadge(project.status)}
                    </div>
                    {project.manager && (
                      <p className="text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {project.manager}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Description
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-400 dark:text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {project.description || "Not set"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Fundi
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-400 dark:text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {project.fundi || "Not set"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      Start Date
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-400 dark:text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {project.startDate || "Not set"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      End Date
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-400 dark:text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {project.endDate || "Not set"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button className="text-sm px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Edit
                  </button>
                  <button className="text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Project Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Project</h2>
              <button
                onClick={() => setShowAdd(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="p-6 space-y-5">
              <div className="space-y-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    End Date *
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  id="status"
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="onHold">On Hold</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}