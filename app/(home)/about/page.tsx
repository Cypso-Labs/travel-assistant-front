"use client";

import router from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import chikenCurry from "../../../public/images/recipe01.png";
import edit_image from "../../../public/images/icons/edit_24px.png";

export default function AboutPage() {

  const about = {
    name: 'Tharusha Madhushan',
  };

  return(

    <div className="bg-gray-50  pt-24">
    <main className="container mx-auto mt-52 px-4 pb-10">
      
      {/* Content Container */}
      <div className="max-w-5xl bg-white rounded-[50px] shadow-xl p-8 mx-auto -mt-10 relative z-10">
        {/* Image */}
        <div className="flex items-center justify-center relative -top-[9.5rem] z-20">
          <Image
            src={chikenCurry} // Replace with the actual image path
            alt="Sri Lankan Chicken Curry"
            className="w-72 h-72 object-cover rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Title with Edit Button */}
        <div className="flex items-center justify-center relative -top-[9rem]">
          <h2 className="text-3xl font-bold text-gray-800 text-center mr-3">
            {about.name}
          </h2>
          <button
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
                placeholder="Enter first name"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Second Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Birth of Date</label>
              <input
                type="text"
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
                placeholder="Enter country / origin"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                placeholder="Enter address"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Postal/Zip</label>
              <input
                type="text"
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
                placeholder="Enter mobile number"
                className="w-full sm:w-[304px] mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
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
                placeholder="Enter email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
      </div>
    </main>
  </div>

  );
}
