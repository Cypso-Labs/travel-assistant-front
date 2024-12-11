"use client"; // Add this line
import React, { useState } from "react";

export default function HelpPage() {
  const [locationOn, setLocationOn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-36">
      {/* Header Section */}
      <header className="flex justify-between items-center pb-6">
        <h1 className="text-2xl font-bold">Help When You Need It Most</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <span className="text-gray-600 text-sm">Location</span>
          <div className="relative w-full sm:w-auto">
            <select className="w-full sm:w-40 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 text-sm">
              <option value="">Select Location</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
          </div>
        </div>
      </header>

      {/* Accordion Section */}
      <div className="mt-8 space-y-4">
        {/* Accordion 1 */}
        <details className="border rounded-md overflow-hidden shadow">
          <summary className="bg-white px-6 py-4 font-semibold cursor-pointer flex justify-between items-center">
            Medical Assistance
            <span className="text-gray-500">▼</span>
          </summary>
          <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500 h-70 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
            <ul className="space-y-4">
              <li>
                <strong>Hospital Nearby You:</strong>
                <ul className="list-disc ml-6">
                  <li>
                    Hospital 01 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                  <li>
                    Hospital 02 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Clinics Nearby You:</strong>
                <ul className="list-disc ml-6">
                  <li>
                    Clinics 01 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                  <li>
                    Clinics 02 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Pharmacies Nearby You:</strong>
                <ul className="list-disc ml-6">
                  <li>
                    Pharmacies 01 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                  <li>
                    Pharmacies 02 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </details>

        {/* Accordion 2 */}
        <details className="border rounded-md overflow-hidden shadow">
          <summary className="bg-white px-6 py-4 font-semibold cursor-pointer flex justify-between items-center">
            Police Services
            <span className="text-gray-500">▼</span>
          </summary>
          <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500 h-70 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
            <ul className="space-y-4">
              <li>
                <strong>Police Station Nearby you :</strong>
                <ul className="list-disc ml-6">
                  <li>
                    Station 01 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                  <li>
                    Hospital 02 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  Clinics Nearby You:{" "}
                  <a href="tel:+94xxxxxxxx" className="text-blue-500">
                    +94xx xxx xxxx
                  </a>
                </strong>
              </li>
            </ul>
          </div>
        </details>

        {/* Accordion 3 */}
        <details className="border rounded-md overflow-hidden shadow">
          <summary className="bg-white px-6 py-4 font-semibold cursor-pointer flex justify-between items-center">
            Transport Assistance
            <span className="text-gray-500">▼</span>
          </summary>
          <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500 h-70 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
            <ul className="space-y-4">
              <li>
                <strong>Roadside Assistance :</strong>
                <ul className="list-disc ml-6">
                  <li>
                    Mechanical Garage 01 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                  <li>
                    Mechanical Garage 02 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
}
