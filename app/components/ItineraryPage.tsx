"use client";

import React, { useState } from "react";
import header_image from "../../public/images/hedar_Img.png";
import Image from "next/image";

export default function ItineraryPage() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLocationOn, setIsLocationOn] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //   if (!startDate || !endDate || !budget) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }

  //   const start = new Date(startDate);
  //   const end = new Date(endDate);
  //   const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  //   if (days <= 0) {
  //     alert("End date must be later than start date.");
  //     return;
  //   }

  //   let latitude = 0;
  //   let longitude = 0;

  //   if (isLocationOn && navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         latitude = position.coords.latitude;
  //         longitude = position.coords.longitude;

  //         const payload = {
  //           location: [latitude, longitude],
  //           budget: parseInt(budget),
  //           categories: ["Beach", "Cultural"],
  //           days: days,
  //         };

  //         fetch("http://127.0.0.1:5000/recommend", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(payload),
  //         })
  //           .then((response) => response.json())
  //           .then((data) => {
  //             console.log("API Response:", data);
  //             alert("Itinerary created successfully!");
  //           })
  //           .catch((error) => {
  //             console.error("Error calling API:", error);
  //             alert("Failed to create itinerary. Please try again.");
  //           });
  //       },
  //       (error) => {
  //         console.error("Error fetching location:", error);
  //         alert("Failed to get location. Please enable location access.");
  //       }
  //     );
  //   } else {
  //     alert("Please enable location to proceed.");
  //   }
  // };
  const handleCreate = async () => {
    if (!startDate || !endDate || !budget) {
      alert("Please fill in all required fields.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      alert("End date must be later than start date.");
      return;
    }

    let latitude = 0;
    let longitude = 0;

    if (isLocationOn && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;

          const itinerary_data = {
            "total_budget": budget,
            "start_date": startDate,
            "end_date": endDate
          }

          localStorage.setItem('itineraryData', JSON.stringify(itinerary_data))

          const payload = {
            location: [latitude, longitude],
            budget: parseInt(budget),
            categories: ["Beach", "Cultural"],
            days: days,
          };

          fetch("http://127.0.0.1:5000/recommend", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("API Response:", data);


              localStorage.setItem("itinerary", JSON.stringify(data));

              alert("Itinerary created successfully and saved locally!");
            })
            .catch((error) => {
              console.error("Error calling API:", error);
              alert("Failed to create itinerary. Please try again.");
            });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Failed to get location. Please enable location access.");
        }
      );
    } else {
      alert("Please enable location to proceed.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <body>
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

          <div className="relative container mx-auto flex justify-between items-center px-4 z-10">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-500 rounded-full w-10 h-10"></div>
              <h1 className="text-2xl font-bold hidden md:block">ITINERARY</h1>
            </div>

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

            <div className="flex space-x-4">
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

        <main className="container mx-auto mt-10 px-4 pb-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold">Make Your Own Itinerary Here</h2>
          </div>

          <form className="bg-white shadow-md rounded-lg p-8 border-2 border-green-500">
            <div className="flex justify-between items-center mb-4">
              {!isLocationOn && (
                <label className="text-sm font-bold text-red-500">
                  <span>❗ Make sure your location is on</span>
                </label>
              )}
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 font-bold">Location</label>
                <div className="relative">
                  <span
                    onClick={() => setIsLocationOn((prev) => !prev)}
                    className={`flex items-center justify-center cursor-pointer w-10 h-6 rounded-full ${isLocationOn ? "bg-green-500" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transform duration-200 ${isLocationOn ? "translate-x-4" : "translate-x-0"
                        }`}
                    ></div>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 mb-4">
              {!isLocationOn ? (
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
              ) : null}

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
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select a time period
              </label>
              <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
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

                <span className="hidden md:block text-xl font-semibold text-gray-700">
                  To
                </span>

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

            <div className="flex justify-center">
              <button
                onClick={handleCreate}
                type="button"
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
              >
                Create Itinerary
              </button>
            </div>
          </form>
        </main>


      </div>
    </body>
  );
}