"use client";

// import React from "react";
import VR from "../../public/images/icons/VR_Icon.png";
import header_image from "../../public/images/hedar_Img.png";
import Map from "../../public/images/Map_IMG.png";
import Image from "next/image";
import React, { useState } from "react";

export default function ItineraryPage_02() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const locations = [
    { id: 1, name: "Location 01", description: "Description", budget: "XXXX" },
    { id: 2, name: "Location 02", description: "Description", budget: "XXXX" },
    { id: 3, name: "Location 03", description: "Description", budget: "XXXX" },
  ];

  const itineraryData = Array(4).fill({
    locations,
    totalBudget: "XXXX",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleImageClick = () => {
    console.log("Image clicked!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative bg-gray-900 text-white py-4">
        <div className="absolute inset-0">
          <Image
            src={header_image}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full bg-gray-900 text-white z-50 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4 py-4">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="bg-gray-500 rounded-full w-10 h-10"></div>
              <h1 className="text-2xl font-bold hidden md:block">ITINERARY</h1>
            </div>

            {/* Navigation for larger screens */}
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="hover:text-gray-300 text-lg">
                Home
              </a>
              <a href="/itinerary" className="hover:text-gray-300 text-lg">
                Itinerary
              </a>
              <a href="/events" className="hover:text-gray-300 text-lg">
                Events
              </a>
              <a href="/recipes" className="hover:text-gray-300 text-lg">
                Recipes
              </a>
              <a href="/emergency" className="hover:text-gray-300 text-lg">
                Emergency
              </a>
              <a href="/about" className="hover:text-gray-300 text-lg">
                About Us
              </a>
            </nav>

            {/* Icons for mobile and desktop */}
            <div className="flex space-x-4">
              {/* Menu Icon */}
              <button
                onClick={toggleSidebar}
                className="md:hidden bg-gray-800 p-2 rounded-full hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5"
                  />
                </svg>
              </button>

              {/* Notification Icon */}
              <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6.75A3.75 3.75 0 1112 3a3.75 3.75 0 013.75 3.75zM3 21a9 9 0 1118 0H3z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="p-4 space-y-4">
          <a href="/" className="block hover:text-gray-300">
            Home
          </a>
          <a href="/itinerary" className="block hover:text-gray-300">
            Itinerary
          </a>
          <a href="/events" className="block hover:text-gray-300">
            Events
          </a>
          <a href="/recipes" className="block hover:text-gray-300">
            Recipes
          </a>
          <a href="/emergency" className="block hover:text-gray-300">
            Emergency
          </a>
          <a href="/about" className="block hover:text-gray-300">
            About Us
          </a>
        </nav>
      </div>

      <main className="container mx-auto mt-6 pb-10 px-4 sm:px-6 lg:px-8">
  <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Itinerary</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
    {itineraryData.map((item, index) => (
      <div key={index} className="bg-white shadow rounded-lg p-4 flex flex-col relative">
        <div className="w-full bg-gray-300 mb-4 rounded">
          <Image
            src={Map}
            alt="Map"
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="mb-4">
          {item.locations.map((loc) => (
            <div key={loc.id} className="flex items-center justify-between mb-2">
              <label className="flex items-center text-gray-700 space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-green-300"
                >
                  <circle cx="12" cy="12" r="8" />
                </svg>
                <span>
                  {loc.name} <span className="text-sm">({loc.description})</span>
                </span>
              </label>

              <span className="text-gray-500">
                <Image
                  src={VR}
                  alt="Location Icon"
                  className="w-5 h-5 cursor-pointer"
                  onClick={handleImageClick}
                />
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center sm:items-start mt-4">
  <p className="text-gray-700 font-semibold text-center sm:text-left">Total Budget</p>
  <p className="text-xl font-bold text-green-600 text-center sm:text-left">
    RS {item.totalBudget}
  </p>
</div>

<div className="relative mt-4 sm:mt-6 flex justify-end w-full">
  <button className="bg-green-500 text-white py-2 px-4 w-40 rounded-md hover:bg-green-600 transition">
    SAVE
  </button>
</div>

      </div>
    ))}
  </div>
</main>


      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-6 lg:px-16 space-y-6 md:space-y-0">
          {/* Section 1 */}
          <div className="w-full md:w-1/3 text-center md:text-left space-y-4">
            <div className="bg-gray-500 rounded-full w-10 h-10 mx-auto md:mx-0"></div>
            <h2 className="text-2xl font-bold">Make Your Own</h2>
            <h3 className="text-green-500 text-xl font-bold">Itinerary</h3>
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition-all duration-300">
              Click Here
            </button>
          </div>

          {/* Section 2 */}
          <div className="w-full md:w-1/3 text-center md:text-left space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-green-500 transition-all duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-green-500 transition-all duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/itinerary"
                  className="hover:text-green-500 transition-all duration-200"
                >
                  Itinerary
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="hover:text-green-500 transition-all duration-200"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/recipes"
                  className="hover:text-green-500 transition-all duration-200"
                >
                  Recipe
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="w-full md:w-1/3 text-center md:text-left space-y-4">
            <div>
              <h3 className="font-bold">More Inquiry</h3>
              <p className="text-gray-300">+xxxx xxx xxxx</p>
            </div>
            <div>
              <h3 className="font-bold">Send Mail</h3>
              <p className="text-gray-300">info@example.com</p>
            </div>
            <div>
              <h3 className="font-bold">Address</h3>
              <p className="text-gray-300">Address Line Here</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
