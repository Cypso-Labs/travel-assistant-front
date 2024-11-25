"use client"; // Add this line

import React, { useState } from "react";
import header_image from '../../public/images/hedar_Img.png'
import Image from "next/image";

export default function ItineraryPage() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLocationOn, setIsLocationOn] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCreate = () => {
    console.log({ location, budget, startDate, endDate });
    alert("Itinerary Created!");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <body>
      <div className="min-h-screen bg-gray-50">
      <header className="relative bg-gray-900 text-white py-4">
          <div className="absolute inset-0">
            <Image src={header_image} alt="Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          <div className="relative container mx-auto flex justify-between items-center px-4 z-10">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="bg-gray-500 rounded-full w-10 h-10"></div>
              <h1 className="text-2xl font-bold hidden md:block">ITINERARY</h1>
            </div>

            {/* Navigation for larger screens */}
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="hover:text-gray-300 text-lg">Home</a>
              <a href="/itinerary" className="hover:text-gray-300 text-lg">Itinerary</a>
              <a href="/events" className="hover:text-gray-300 text-lg">Events</a>
              <a href="/recipes" className="hover:text-gray-300 text-lg">Recipes</a>
              <a href="/emergency" className="hover:text-gray-300 text-lg">Emergency</a>
              <a href="/about" className="hover:text-gray-300 text-lg">About Us</a>
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
        </header>

         {/* Sidebar */}
         <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
            <a href="/" className="block hover:text-gray-300">Home</a>
            <a href="/itinerary" className="block hover:text-gray-300">Itinerary</a>
            <a href="/events" className="block hover:text-gray-300">Events</a>
            <a href="/recipes" className="block hover:text-gray-300">Recipes</a>
            <a href="/emergency" className="block hover:text-gray-300">Emergency</a>
            <a href="/about" className="block hover:text-gray-300">About Us</a>
          </nav>
        </div>

      <main className="container mx-auto mt-10 px-4 pb-10">
       
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">My Itinerary</h1>
        </div>

       
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Make Your Own Itinerary Here</h2>
        </div>

        
        <form className="bg-white shadow-md rounded-lg p-8 border-2 border-green-500">
         
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-red-500">
              <span>❗ Make sure your location is on</span>
            </label>
            <div className="flex items-center space-x-2">
              <label className="text-gray-700 font-bold">Location</label>
              <div className="relative">
                <span
                  onClick={() => setIsLocationOn((prev) => !prev)}
                  className={`flex items-center justify-center cursor-pointer w-10 h-6 rounded-full ${
                    isLocationOn ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transform duration-200 ${
                      isLocationOn ? "translate-x-4" : "translate-x-0"
                    }`}
                  ></div>
                </span>
              </div>
            </div>
          </div>

         
          <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 mb-4">
            <div className="w-full md:w-1/2">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="location"
              >
                Your Location *
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                placeholder="Enter your location"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="budget"
              >
                Enter your budget (in RS) *
              </label>
              <input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                placeholder="Enter your budget"
              />
              <p className="text-sm text-gray-500">
                Convert Global currency to rupees
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Select a time period
            </label>
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
                {/* Start Date */}
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="start-date"
                  >
                    Start Date *
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                  />
                </div>

                {/* Separator */}
                <span className="hidden md:block text-xl font-semibold text-gray-700">
                  To
                </span>
                <span className="md:hidden text-center font-semibold text-gray-700">
                  To
                </span>

                {/* End Date */}
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="end-date"
                  >
                    End Date *
                  </label>
                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                  />
                </div>
              </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={handleCreate}
              className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600"
            >
              CREATE
            </button>
          </div>
        </form>
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
    </body>    
  );
}
