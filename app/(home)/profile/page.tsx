"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import edit_image from "../../../public/images/icons/edit_24px.png";
import axios, { AxiosError } from "axios";
import router from "next/router";
import Swal from "sweetalert2";

export default function ProfilePage() {
    
  const [userData, setUserData] = useState({
    firstName: "",
    secondName: "",
    dateOfBirth: "",
    country: "",
    address: "",
    postalZip: "",
    contact: "",
    userName: "",
    email: "",
    preferences: [],
    password: "",
  });

  // State for preferences
  const [preferences, setPreferences] = useState([
    "Adventure",
    "Natural",
    "Religious",
    "Mountain",
    "Wildlife",
    "History",
    "Beach",
  ]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  // State for profile image
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = JSON.parse(localStorage.getItem("UserData") || "{}");

      if (!user.user_id || !user.access_token) {
        console.error("User data or token is missing.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${user.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;

          // Update user data state
          setUserData({
            firstName: data.first_name || "",
            secondName: data.last_name || "",
            dateOfBirth: data.birth_of_date || "",
            country: data.country_of_orgin || "",
            address: data.city || "",
            postalZip: data.postal_zip || "",
            contact: data.contact_number || "",
            userName: data.username || "",
            email: data.email || "",
            preferences: data.preferences || [],
            password: data.password || "",
          });

  
          

          // Set preferences and profile image state
          setPreferences((prev) =>
            [...new Set([...prev, ...(data.preferences || [])])].sort()
          );
          setSelectedPreferences(data.preferences || []);
          setProfileImage(data.profile_image || null); // Assume `profile_image` contains the URL of the image
        }
      } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching user data:", err);

        if (err.response && (err.response.status === 401 || err.response.status === 422)) {
          Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "warning",
            confirmButtonText: "Go to Login",
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("UserData"); // Clear user data
              router.push("/account/sign-in"); // Redirect to login
            }
          });
        }
      }
    };

    fetchUserData();
  }, [router]);

  const [isPreferenceAdded, setIsPreferenceAdded] = useState(false);

  // Handle preference toggling
  const handlePreferenceToggle = (name: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(name) ? prev.filter((pref) => pref !== name) : [...prev, name]
    );
  };

  const handleAddPreference = () => {
    setPreferences(selectedPreferences);
    setIsPreferenceAdded(true);
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      setFileToUpload(file);
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  }; 

  // Update User Data
  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("UserData") || "{}");
  
    if (!user.user_id || !user.access_token) {
      console.error("User data or token is missing.");
      return;
    }
  
    let uploadedImageUrl = profileImage;
  
    // Upload profile image if a new file is selected
    if (fileToUpload) {
      const formData = new FormData();
      formData.append("image", fileToUpload);
      formData.append("process_denoise", "true");
      formData.append("process_sharpness", "true");
  
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/upload_image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (response.status === 200) {
          uploadedImageUrl = response.data.image_url; // Use the image URL returned from the API
          console.log("Image uploaded:", uploadedImageUrl);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        Swal.fire({
          title: "Image Upload Failed",
          text: "Failed to upload the image. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
    }
  
    // Submit the profile data
    const formData = {
      first_name: userData.firstName,
      last_name: userData.secondName,
      username: newUserName,
      city: userData.address,
      postal_zip: userData.postalZip,
      country_of_orgin: userData.country,
      preferences: selectedPreferences,
      birth_of_date: userData.dateOfBirth,
      contact_number: userData.contact,
      profile_image: uploadedImageUrl,
      password: userData.password
    };
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${user.user_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Profile updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Reload the page after the user clicks "OK"
          window.location.reload();
        });
      }
    } catch (error) {
      const err = error as AxiosError;
              if (err.response && (err.response.status === 401 || err.response.status === 422)) {
                Swal.fire({
                  title: "Token Error",
                  text: "Please login to continue.",
                  icon: "warning",
                  showCancelButton: false,
                  confirmButtonText: "Go to Login",
                  customClass: {
                    confirmButton: "swal-login-button"
                  }
                }).then((result) => {
                  if (result.isConfirmed) {
                    router.push("/account/sign-in");
                  }
                });
              }
    }
  };

  const [isEditingUserName, setIsEditingUserName] = useState(false); // state to track editing
  const [newUserName, setNewUserName] = useState(userData.userName);

  const handleEditUserName = () => {
    setIsEditingUserName(true);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(e.target.value);
  };
  
  // Delete user and logout
  const handleDeleteAccount = async () => {
    const user = JSON.parse(localStorage.getItem("UserData") || "{}");
  
    if (!user.user_id || !user.access_token) {
      console.error("User data or token is missing.");
      return;
    }
  
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${user.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
  
      if (response.status === 200) {
        Swal.fire({
          title: "Account Deleted",
          text: "Your account has been deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Clear localStorage and redirect to login page
          localStorage.removeItem("UserData");
          router.push("/account/sign-in");
        });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete account. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  

  return(

    <div className="bg-gray-50  pt-24">
    <main className="container mx-auto mt-52 px-4 pb-10">
      
      {/* Content Container */}
      <div className="max-w-5xl bg-white rounded-[50px] shadow-xl p-8 mx-auto -mt-10 relative z-10">
        {/* Image */}
        <div className="flex items-center justify-center relative -top-[9.5rem] z-20 group">
        {profileImage ? (
          <img
            src={profileImage} // Replace with the actual image path
            alt="Sri Lankan Chicken Curry"
            className="w-72 h-72 object-cover rounded-full border-4 border-white shadow-lg"
          />
        ) : (
          <div className="w-72 h-72 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
          <label
            htmlFor="profileImage"
            className="absolute bg-white text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Image src={edit_image} alt="Icon" className="w-6 h-6" />
          </label>
        </div>

        {/* Title with Edit Button */}
        <div className="flex items-center justify-center relative -top-[9rem]">
        {isEditingUserName ? (
              <input
                type="text"
                value={newUserName}
                onChange={handleUserNameChange}
                className="text-3xl font-bold text-gray-800 text-center mr-3 rounded-[10px]"
              />
            ) : (
              <h2 className="text-3xl font-bold text-gray-800 text-center mr-3">
              {userData.userName}
              </h2>
          )}
          <button
            onClick={handleEditUserName}
            className="text-red-500 hover:text-red-700">
            <Image src={edit_image} alt="Icon" className="w-6 h-6" />
          </button>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 relative -top-[5rem]">
            Personal Details
        </h2>

        {/* Divider Line */}
        <div className="border-t border-green-500 my-6 relative -top-[6rem]"></div>

         {/* Inputs Section */}
         <div className="space-y-6 relative -top-[6rem]">
          {/* Flex Container 1 */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={userData.firstName}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                placeholder="Enter first name"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Second Name</label>
              <input
                type="text"
                value={userData.secondName}
                onChange={(e) => setUserData({ ...userData, secondName: e.target.value })}
                placeholder="Enter last name"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Birth of Date</label>
              <input
                type="date"
                value={userData.dateOfBirth}
                onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
                placeholder="Enter bod"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Flex Container 2 */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Country or Origin</label>
              <input
                type="text"
                value={userData.country}
                onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                placeholder="Enter country / origin"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                placeholder="Enter address"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Postal/Zip</label>
              <input
                type="text"
                value={userData.postalZip}
                onChange={(e) => setUserData({ ...userData, postalZip: e.target.value })}
                placeholder="Enter postal zip"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Flex Container 3 */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Contact</label>
              <input
                type="tel"
                value={userData.contact}
                onChange={(e) => setUserData({ ...userData, contact: e.target.value })}
                placeholder="Enter mobile number"
                className="w-full sm:w-[304px] mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="mt-7 max-w-md">
            <h1 className="text-[20px] font-[600] mb-5">Edit Preferences</h1>

            <div className="flex flex-wrap border-2 border-green-300">
              {preferences.map((preference, index) => (
                <button
                  key={index}
                  className={`m-1 px-3 py-2 rounded-[10px] ${
                    selectedPreferences.includes(preference)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => handlePreferenceToggle(preference)}
                  >
                    {preference}
                  </button>
                ))}
                {!isPreferenceAdded && (
                <button
                  onClick={handleAddPreference}
                  className="px-3 font-bold">
                + Add
                </button>
                )}
            </div>
          </div>

        </div>

        <h2 className="text-3xl font-bold text-gray-800">
            Authentication Details
        </h2>

        {/* Divider Line */}
        <div className="border-t border-green-500 my-6"></div>

        {/* Flex Container 4 */}
        <div className="flex flex-wrap gap-4 md:gap-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                placeholder="Enter email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="flex justify-end mt-10">
            <button 
              onClick={handleSubmit}
              type="button"
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
            >
              Apply
            </button>
          </div>
          <div className="flex justify-end mt-5">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
          >
            Delete My Account
          </button>
          </div>

      </div>
    </main>
  </div>

  );
}
