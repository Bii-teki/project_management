import React, { useState, useRef } from "react";
import Image from 'next/image';
import { FiEdit, FiSave, FiX, FiUpload, FiUser, FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const UserProfile = () => {
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
    <div className="min-h-3/4 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-indigo-200 dark:bg-indigo-900/20 opacity-20 -z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300 dark:bg-blue-800/30 rounded-full filter blur-3xl opacity-30 -z-10"></div>

        {/* Main Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 transform hover:shadow-2xl">
          {/* Profile Header with Gradient */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-700 dark:to-blue-800 p-6 text-white">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">Profile</h1>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all"
                >
                  <FiEdit size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Image with Artistic Frame */}
              <div className="relative group">
                <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl relative">
                  {tempInfo.profileImage ? (
                    <Image
                      src={tempInfo.profileImage}
                      alt={`${tempInfo.name}'s profile`}
                      className="w-full h-full object-cover"
                      width={500}
                      height={500}
                      style={{
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                      <FiUser className="text-indigo-400 dark:text-indigo-600 text-5xl" />
                    </div>
                  )}
                </div>

                {isEditing && (
                  <>
                    <button
                      onClick={triggerFileInput}
                      className="absolute -bottom-3 -right-3 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-all transform hover:scale-110 shadow-lg flex items-center justify-center z-10"
                    >
                      <FiUpload size={18} />
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
                <div className="absolute -inset-2 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 w-full">
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={tempInfo.name}
                        onChange={handleChange}
                        className="text-3xl font-bold text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent focus:border-indigo-300"
                      />
                    ) : (
                      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{userInfo.name}</h1>
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
                        className="text-xl text-indigo-600 dark:text-indigo-400 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent focus:border-indigo-300"
                      />
                    ) : (
                      <p className="text-xl text-indigo-600 dark:text-indigo-400 font-medium">{userInfo.role}</p>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <FiMail className="text-gray-500 dark:text-gray-400 text-lg" />
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={tempInfo.email}
                          onChange={handleChange}
                          className="flex-1 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent focus:border-indigo-300"
                        />
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300">{userInfo.email}</span>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3">
                      <FiMapPin className="text-gray-500 dark:text-gray-400 text-lg" />
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={tempInfo.location}
                          onChange={handleChange}
                          className="flex-1 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent focus:border-indigo-300"
                        />
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300">{userInfo.location}</span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3">
                      <FiPhone className="text-gray-500 dark:text-gray-400 text-lg" />
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={tempInfo.phone}
                          onChange={handleChange}
                          className="flex-1 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent focus:border-indigo-300"
                        />
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300">{userInfo.phone}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-4 h-4 bg-indigo-500 rounded-full"></span>
                About Me
              </h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={tempInfo.bio}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={5}
                  aria-label="Edit your bio"
                />
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {userInfo.bio}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <FiX size={18} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg hover:shadow-indigo-500/20"
                >
                  <FiSave size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;