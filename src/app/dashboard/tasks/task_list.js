import { useState, useRef } from "react";
import { FiPlus, FiFolder, FiClock, FiCalendar, FiX, FiUsers,FiInfo, FiUser, FiImage, FiTrash2 } from "react-icons/fi";

// Sample data
const dummyPeople = [
  { id: 1, name: "John Doe", role: "manager" },
  { id: 2, name: "Jane Smith", role: "manager" },
  { id: 3, name: "Mike Johnson", role: "fundi" },
  { id: 4, name: "Sarah Williams", role: "fundi" },
  { id: 5, name: "David Brown", role: "worker" },
  { id: 6, name: "Emily Davis", role: "worker" },
];

const dummyProjects = {
  active: [
    {
      id: 1,
      title: "Office Building Construction",
      description: "5-story commercial building",
      startDate: "2023-06-01",
      endDate: "2024-05-30",
      status: "active",
      manager: "John Doe",
      fundi: "Mike Johnson",
      assignedPeople: [1, 3, 5],
      progressImages: [
        { id: 1, url: "https://images.unsplash.com/photo-1726056652752-58303aafa0c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8", date: "2023-07-15", caption: "Foundation work" },
        { id: 2, url: "https://plus.unsplash.com/premium_photo-1673388695233-1e66ff1f17dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8", date: "2023-08-20", caption: "First floor completed" }
      ]
    }
  ],
  archived: []
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState("active");
  const [projects, setProjects] = useState(dummyProjects);
  const [showAdd, setShowAdd] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "planning",
    manager: "",
    fundi: "",
    assignedPeople: []
  });
  const [showPeopleSelector, setShowPeopleSelector] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImage, setNewImage] = useState({ file: null, caption: "" });
  const fileInputRef = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();
    const id = Date.now();
    setProjects({
      ...projects,
      active: [...projects.active, { ...newProject, id, progressImages: [] }],
    });
    setNewProject({ 
      title: "", 
      description: "", 
      startDate: "", 
      endDate: "", 
      status: "planning",
      manager: "",
      fundi: "",
      assignedPeople: []
    });
    setShowAdd(false);
  };

  const togglePersonAssignment = (personId) => {
    setNewProject(prev => {
      if (prev.assignedPeople.includes(personId)) {
        return {
          ...prev,
          assignedPeople: prev.assignedPeople.filter(id => id !== personId)
        };
      } else {
        return {
          ...prev,
          assignedPeople: [...prev.assignedPeople, personId]
        };
      }
    });
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

  const getPersonById = (id) => dummyPeople.find(person => person.id === id);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage({ ...newImage, file });
    }
  };

  const addProgressImage = (projectId) => {
    if (!newImage.file) return;
    
    // In a real app, you would upload the image to a server here
    // For demo purposes, we'll create a mock URL
    const mockImageUrl = URL.createObjectURL(newImage.file);
    
    const newImageObj = {
      id: Date.now(),
      url: mockImageUrl,
      date: new Date().toISOString().split('T')[0],
      caption: newImage.caption
    };
    
    setProjects(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(project => 
        project.id === projectId
          ? { ...project, progressImages: [...project.progressImages, newImageObj] }
          : project
      )
    }));
    
    setNewImage({ file: null, caption: "" });
    setSelectedProject(null);
  };

  const removeImage = (projectId, imageId) => {
    setProjects(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(project => 
        project.id === projectId
          ? { ...project, progressImages: project.progressImages.filter(img => img.id !== imageId) }
          : project
      )
    }));
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

      {/* Project List */}
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
                      <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Managed by: {project.manager}
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
                      <FiInfo className="text-gray-400 dark:text-gray-500" />
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
                      <FiUser className="text-gray-400 dark:text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {project.fundi || "Not assigned"}
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
                      Progress Images
                    </div>
                    <div className="flex items-center gap-2">
                      <FiImage className="text-gray-400 dark:text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {project.progressImages?.length || 0} photos
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Images Gallery */}
                {project.progressImages?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Progress Photos</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {project.progressImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.url}
                            alt={image.caption || "Progress photo"}
                            className="w-full h-24 object-cover rounded-lg cursor-pointer"
                            onClick={() => {
                              setSelectedImage(image);
                              setShowImageModal(true);
                            }}
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(project.id, image.id);
                              }}
                              className="text-white hover:text-red-400 transition-colors"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                          {image.caption && (
                            <p className="text-xs text-gray-600 dark:text-gray-300 truncate mt-1">{image.caption}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => {
                      setSelectedProject(project.id);
                      fileInputRef.current?.click();
                    }}
                    className="text-sm px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <FiPlus /> Add Photo
                  </button>
                  <div className="flex gap-2">
                    <button className="text-sm px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Edit
                    </button>
                    <button className="text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Image Upload Modal */}
      {selectedProject && newImage.file && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Progress Photo</h2>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setNewImage({ file: null, caption: "" });
                }}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-center">
                <img
                  src={URL.createObjectURL(newImage.file)}
                  alt="Preview"
                  className="max-h-64 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="caption" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Caption (optional)
                </label>
                <input
                  type="text"
                  id="caption"
                  value={newImage.caption}
                  onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="Describe this progress photo"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    setNewImage({ file: null, caption: "" });
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => addProgressImage(selectedProject)}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Upload Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image View Modal */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
            >
              <FiX className="text-xl" />
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
              <img
                src={selectedImage.url}
                alt={selectedImage.caption || "Progress photo"}
                className="w-full max-h-[80vh] object-contain"
              />
              {(selectedImage.caption || selectedImage.date) && (
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  {selectedImage.caption && <p className="text-gray-900 dark:text-white">{selectedImage.caption}</p>}
                  {selectedImage.date && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Uploaded on: {new Date(selectedImage.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
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
                  <label htmlFor="manager" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Project Manager *
                  </label>
                  <select
                    id="manager"
                    value={newProject.manager}
                    onChange={(e) => setNewProject({ ...newProject, manager: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    required
                  >
                    <option value="">Select Manager</option>
                    {dummyPeople.filter(p => p.role === "manager").map(person => (
                      <option key={person.id} value={person.name}>{person.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="fundi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Fundi *
                  </label>
                  <select
                    id="fundi"
                    value={newProject.fundi}
                    onChange={(e) => setNewProject({ ...newProject, fundi: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    required
                  >
                    <option value="">Select Fundi</option>
                    {dummyPeople.filter(p => p.role === "fundi").map(person => (
                      <option key={person.id} value={person.name}>{person.name}</option>
                    ))}
                  </select>
                </div>
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

              <div className="space-y-1 relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Assign Team Members
                </label>
                <button
                  type="button"
                  onClick={() => setShowPeopleSelector(!showPeopleSelector)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-left flex justify-between items-center bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  <span>
                    {newProject.assignedPeople.length > 0 
                      ? `${newProject.assignedPeople.length} people selected`
                      : "Select team members"}
                  </span>
                  <FiUsers className="text-gray-400" />
                </button>

                {showPeopleSelector && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-md border border-gray-200 dark:border-gray-600 max-h-60 overflow-auto">
                    {dummyPeople.map(person => (
                      <div 
                        key={person.id} 
                        className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center ${newProject.assignedPeople.includes(person.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                        onClick={() => togglePersonAssignment(person.id)}
                      >
                        <input
                          type="checkbox"
                          checked={newProject.assignedPeople.includes(person.id)}
                          onChange={() => {}}
                          className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span>{person.name} ({person.role})</span>
                      </div>
                    ))}
                  </div>
                )}
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