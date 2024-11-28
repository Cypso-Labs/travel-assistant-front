"use client";

import React, { useEffect, useState } from "react";
import header_image from "../../public/images/hedar_Img.png";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";

export default function ItineraryPage() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLocationOn, setIsLocationOn] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userPreferences, setUserPreferences] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("UserData"));

    const fetchUser = async () => {
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
          setUserPreferences(response.data.preferences);
          console.log(response.data.preferences);
        }
      } catch (error) {
        const { response } = error;
        console.log(response.data);
      }
    };

    fetchUser();
  }, []);

  const handleCreate = async () => {
    if (!startDate || !endDate || !budget) {
      Swal.fire({
        title: "Empty Fields",
        text: "Please fill in all required fields.",
        icon: "info",
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      Swal.fire({
        title: "Invalid Date!",
        text: "End date must be later than start date.",
        icon: "info",
      });
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
            total_budget: budget,
            start_date: startDate,
            end_date: endDate,
          };

          localStorage.setItem("itineraryData", JSON.stringify(itinerary_data));

          const payload = {
            location: [latitude, longitude],
            budget: parseInt(budget),
            categories: userPreferences || null,
            days: days,
          };

          console.log(payload);

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

              Swal.fire({
                title: "Success!",
                text: "Itinerary created successfully and saved locally!",
                icon: "success",
              });
            })
            .catch((error) => {
              console.error("Error calling API:", error);
              Swal.fire({
                title: "Error!",
                text: "Failed to create itinerary. Please try again.",
                icon: "error",
              });
            });
        },
        (error) => {
          console.error("Error fetching location:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to get location. Please enable location access.",
            icon: "error",
          });
        }
      );
    } else {
      Swal.fire({
        title: "Location Disabled!!",
        text: "Please enable location to proceed.",
        icon: "info",
      });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                  className={`flex items-center justify-center cursor-pointer w-10 h-6 rounded-full ${
                    isLocationOn ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transform duration-200 ${
                      isLocationOn ? "translate-x-2" : "-translate-x-2"
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
  );
}
