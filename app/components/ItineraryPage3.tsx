"use client"; // Required for Next.js apps

import React, { useEffect, useState } from "react";
import header_image from '../../public/images/hedar_Img.png'
import delete_image from '../../public/images/icons/delete.png'
import edit_image from '../../public/images/icons/edit.png'
import file_image from '../../public/images/icons/document.png'
import VR from '../../public/images/icons/VR_Icon.png'
import Image from "next/image";
import axios from "axios";
import MapComponent from "./googleMap";

export default function ItineraryPage() {

  const user = JSON.parse(localStorage.getItem('UserData') || '{}');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // State variables
  const [itinerary, setItinerary] = useState([]);

  const locations = [
    { id: 1, name: "Location 01", description: "Description", budget: "XXXX" },
    { id: 2, name: "Location 02", description: "Description", budget: "XXXX" },
    { id: 3, name: "Location 03", description: "Description", budget: "XXXX" },
  ];


  useEffect(() => {

    let locations = [];

    const fetchAllItineraries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/itineraries', {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        if (response.status === 200) {
          locations = response.data.itineraries;
          console.log(response.data.itineraries);
          setItinerary(response.data.itineraries); // Store all locations in state
        }
      } catch (error) {
        const { response } = error;
        console.log(response.data);
      }
    };

    fetchAllItineraries()

  }, []);

  // Handle delete itinerary from the backend and update the frontend
  const handleDeleteItinerary = async (id) => {
    try {
      // Send DELETE request to the backend
      const response = await axios.delete(`http://localhost:5000/api/v1/itineraries/${id}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data.message);

        // Update the state to remove the deleted itinerary
        setItinerary((prevItinerary) => prevItinerary.filter(item => item.id !== id));
      }
    } catch (error) {
      if (error.response) {
        console.error('Error deleting itinerary:', error.response.data);
      } else {
        console.error('Error deleting itinerary:', error.message);
      }
    }
  };

  // Handle remove itinerary
  const handleRemove = (id: number) => {
    setItinerary(itinerary.filter(item => item.id !== id));
  };
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const totalBudget = itinerary.reduce((acc, item) => {
    
    const numericBudget = parseInt(item.total_budget);
    return acc + numericBudget;
  }, 0);
  
  console.log(`Total Budget: RS ${totalBudget}`);
  
  const handleImageClick = () => {
    console.log("Image clicked!");
  };



  function removeMainSection(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
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

      {/*back button*/}
      <div className="bg-white p-6 rounded-lg shadow-lg border flex py-3 mt-6 ml-10 mr-10">
        <button className=" bg-black text-white px-1 rounded hover:bg-red-600 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 transform rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold absolute right-0 px-20">My Itinerary</h2>
      </div>


      {/* Itinerary Table Section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-left">My Itinerary</h2>
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-[800px] w-full bg-white text-left border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-900"></th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900">Name</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900">Budget</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900">Start Date</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900">End Date</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-900"></th>
              </tr>
            </thead>
            <tbody>
              {itinerary.map(item => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  {/* Edit Action */}
                  <button className="text-blue-500 hover:text-blue-700">
                    <Image src={file_image} alt="Icon" className="w-6 h-6"/>
                    </button>
                  <td className="px-6 py-4 text-sm text-gray-700 ">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 ">{item.total_budget}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 ">{item.start_date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 ">{item.end_date}</td>
                  <td className="px-6 py-4 flex items-center space-x-4">
                    {/* Edit Action */}
                    <button className="text-blue-500 hover:text-blue-700">
                    <Image src={edit_image} alt="Icon" className="w-6 h-6"/>
                    </button>
                    {/* Remove Action */}
                    <button
                      onClick={() => handleDeleteItinerary(item.id)}
                      className="text-red-500 hover:text-red-700">
                      <Image src={delete_image} alt="Icon" className="w-6 h-6"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <main className="container mx-auto mt-6 pb-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Preview</h2>

        {/* Card Section */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          {/* Edit and Remove Buttons */}
          <div className="flex justify-end pb-2">
            <button className="text-blue-500 hover:text-blue-700">
              <Image src={edit_image} alt="Edit Icon" className="w-6 h-6" />
            </button>
            <button
              onClick={() => removeMainSection()}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              <Image src={delete_image} alt="Delete Icon" className="w-6 h-6" />
            </button>
          </div>

          {/* Map Section */}
         <MapComponent/>

          {/* Location and Budget Section */}
          <div className="flex flex-col lg:flex-row justify-between mb-4">
            {/* Locations List */}
            <div className="mb-6 lg:w-2/3">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="flex items-center justify-between mb-3 px-2 py-1 bg-gray-50 rounded hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-2">
                    {/* Label */}
                    <label className="flex items-center text-gray-700 space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-green-400"
                      >
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                      <span>
                        {loc.name}{" "}
                        <span className="text-sm text-gray-500">({loc.description})</span>
                      </span>
                    </label>

                    {/* VR Button */}
                    <button
                      onClick={handleImageClick}
                      className="text-gray-500 hover:text-gray-700 flex items-center"
                    >
                      <Image
                        src={VR}
                        alt="VR Icon"
                        className="w-5 h-5 cursor-pointer"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Budget Section */}
            <div className="flex flex-col items-center sm:items-start lg:w-1/3 mt-4 lg:mt-0 pt-4">
              <p className="text-gray-700 font-semibold text-center sm:text-left">
                Total Budget
              </p>
              <p className="text-xl font-bold text-green-600 text-center sm:text-left">
                RS {totalBudget}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
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
