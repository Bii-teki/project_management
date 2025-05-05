import React, { useState, useRef } from "react";
import { FiEdit, FiSave, FiX, FiUpload, FiUser } from "react-icons/fi";

const UserProfile = () => {
  // Sample user data
  const DEFAULT_USER = {
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "A passionate developer who loves coding and building meaningful applications. Currently working on exciting projects that make a difference.",
    profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300",
    role: "Senior Developer",
    location: "Nairobi, Kenya",
    phone: "+254 712 345 678"
  };

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(DEFAULT_USER);
  const [tempInfo, setTempInfo] = useState(DEFAULT_USER);
  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setTempInfo(userInfo);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setUserInfo(tempInfo);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempInfo(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-100 dark:border-indigo-900/30 shadow-md">
              {tempInfo.profileImage ? (
                <img
                  src={tempInfo.profileImage}
                  alt={`${tempInfo.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                  <FiUser className="text-indigo-400 dark:text-indigo-600 text-4xl" />
                </div>
              )}
            </div>
            
            {isEditing && (
              <>
                <button
                  onClick={triggerFileInput}
                  className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition transform hover:scale-110 shadow-lg flex items-center justify-center"
                >
                  <FiUpload size={16} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="space-y-4">
            {/* Name */}
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={tempInfo.name}
                  onChange={handleChange}
                  className="text-2xl font-bold text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{userInfo.name}</h1>
              )}
            </div>

            {/* Role */}
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="role"
                  value={tempInfo.role}
                  onChange={handleChange}
                  className="text-lg text-indigo-600 dark:text-indigo-400 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-lg text-indigo-600 dark:text-indigo-400">{userInfo.role}</p>
              )}
            </div>

            {/* Email */}
            <div>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={tempInfo.email}
                  onChange={handleChange}
                  className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{userInfo.email}</p>
              )}
            </div>

            {/* Location */}
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={tempInfo.location}
                  onChange={handleChange}
                  className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{userInfo.location}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={tempInfo.phone}
                  onChange={handleChange}
                  className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{userInfo.phone}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">About</h2>
        {isEditing ? (
          <textarea
            name="bio"
            value={tempInfo.bio}
            onChange={handleChange}
            className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={4}
            aria-label="Edit your bio"
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            {userInfo.bio}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <FiX size={18} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md"
            >
              <FiSave size={18} />
              Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FiEdit size={18} />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;