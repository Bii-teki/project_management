import { useState } from "react";
import { FiPlus, FiPackage, FiClock } from "react-icons/fi";
import { materials } from "../../dashboard/materials/materials"


export default function MaterialsSAP() {
  const [activeTab, setActiveTab] = useState("active");
//   const [materials, setMaterials] = useState(dummyMaterials);
  const [showAdd, setShowAdd] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    quantity: "",
    supplier: "",
    dateReceived: "",
  });

  const handleAdd = () => {
    const id = Date.now();
    setMaterials({
      ...materials,
      active: [...materials.active, { ...newMaterial, id }],
    });
    setNewMaterial({ name: "", quantity: "", supplier: "", dateReceived: "" });
    setShowAdd(false);
  };

  return (
<main className="flex-1 p-6 md:p-8">
  {/* Header Section */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Materials Management</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage your construction materials</p>
    </div>
    <button 
      onClick={() => setShowAdd(true)} 
      className="btn btn-primary gap-2 min-w-[180px] hover:shadow-md transition-all"
    >
      <FiPlus className="text-lg" />
      New Material
    </button>
  </div>

  {/* Tabs Navigation */}
  <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
    <button
      className={`px-4 py-3 font-medium text-sm relative transition-colors duration-200 ${
        activeTab === "active"
          ? "text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      }`}
      onClick={() => setActiveTab("active")}
    >
      Active Materials
      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
        {materials.active.length}
      </span>
    </button>
    <button
      className={`px-4 py-3 font-medium text-sm relative transition-colors duration-200 ${
        activeTab === "archived"
          ? "text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      }`}
      onClick={() => setActiveTab("archived")}
    >
      Archived Materials
      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
        {materials.archived.length}
      </span>
    </button>
  </div>

  {/* Empty State */}
  {materials[activeTab].length === 0 ? (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-5 mb-4 md:mb-0">
        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
          <FiClock className="text-2xl text-blue-500 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No materials found</h3>
          <p className="text-gray-500 dark:text-gray-400">Get started by adding your first material entry</p>
        </div>
      </div>
      <button 
        onClick={() => setShowAdd(true)} 
        className="btn btn-primary gap-2 hover:shadow-md transition-all"
      >
        <FiPlus />
        Add Material
      </button>
    </div>
      ) : (
<div className="grid gap-5">
  {materials[activeTab].map((mat) => (
    <div 
      key={mat.id} 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-6">
        {/* Header with icon and title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg flex-shrink-0">
            <FiPackage className="text-blue-600 dark:text-blue-400 text-xl" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {mat.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Supplier: <span className="font-medium">{mat.supplier}</span>
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Quantity */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Quantity
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {mat.quantity}
            </div>
          </div>

          {/* Date Received */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Date Received
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {new Date(mat.dateReceived).toLocaleDateString()}
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Description
            </div>
            <div className="font-medium text-gray-700 dark:text-gray-300 line-clamp-2">
              {mat.description || 'N/A'}
            </div>
          </div>

          {/* Source */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Source
            </div>
            <div className="font-medium text-gray-700 dark:text-gray-300 truncate">
              {mat.source || 'N/A'}
            </div>
          </div>
        </div>

        {/* Optional: Action buttons */}
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

      {/* Add Material Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-md transition-all duration-300 border border-gray-200 dark:border-gray-700">
          {/* Header with custom font */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Add New Material
          </h2>
          
          <form className="space-y-4">
            {/* Standard Input Fields */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Material Name
              </label>
              <input
                type="text"
                id="name"
                value={newMaterial.name}
                onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                required
              />
            </div>
      
            <div className="space-y-1">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={newMaterial.quantity}
                onChange={(e) => setNewMaterial({ ...newMaterial, quantity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                required
              />
            </div>
      
            <div className="space-y-1">
              <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Supplier
              </label>
              <input
                type="text"
                id="supplier"
                value={newMaterial.supplier}
                onChange={(e) => setNewMaterial({ ...newMaterial, supplier: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                required
              />
            </div>
      
            <div className="space-y-1">
              <label htmlFor="date-received" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date Received
              </label>
              <input
                type="date"
                id="date-received"
                value={newMaterial.dateReceived}
                onChange={(e) => setNewMaterial({ ...newMaterial, dateReceived: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                required
              />
            </div>
      
            {/* Action Buttons */}
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
                onClick={handleAdd}
                className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                Save Material
              </button>
            </div>
          </form>
        </div>
      </div>
      )}
    </main>
  );
}
