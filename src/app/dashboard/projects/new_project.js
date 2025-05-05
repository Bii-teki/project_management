import { FiHome, FiMapPin, FiUser, FiDollarSign } from "react-icons/fi";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Project</h1>
      
      <form className="space-y-4">
        {/* Form fields same as your modal */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Project Name</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter project name"
              className="input input-bordered w-full pl-10"
              required
            />
            <FiHome className="absolute left-3 top-3 text-base-content/70" />
          </div>
        </div>
        
        {/* Other form fields... */}
        
        <div className="flex justify-end gap-4 mt-6">
          <button type="button" className="btn btn-ghost">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}