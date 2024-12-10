"use client";

import router from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import chikenCurry from "../../../public/images/recipe01.png";

export default function RecipesPage() {

  const recipe = {
    image: 'https://example.com/chicken-curry.jpg',
    title: 'Spaghetti Bolognese',
    description: 'A classic Italian pasta dish.',
    culturalBackground: 'Chicken curry is an integral part of Sri Lankan cuisine...',
    ingredients: ['1 kg Chicken', '2 tbsp Oil', '1 Onion, sliced', '2 tsp Chili Powder', '1 tsp Turmeric', '2 Cups Coconut Milk'],
    instructions: ['Boil pasta', 'Cook beef and onion', 'Mix with sauce', 'Serve']
  };

  const handleNavigate = () => {
    router.push("/"); // Navigate to the homepage
  };

  return(

    <div className="bg-gray-50  pt-24">
    <main className="container mx-auto mt-10 px-4 pb-10">
      
    <div className="flex">
          <button
            className="bg-black text-white px-2 rounded hover:bg-red-600 transition duration-200 mr-10"
            onClick={handleNavigate} // Add onClick to navigate to homepage
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 transform rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
          <h2 className="text-xl font-bold">Details</h2>
        </div>

        <div className="relative p-4">
          {/* Image */}
          <Image
            src={chikenCurry} // Replace with the actual image path
            alt="Sri Lankan Chicken Curry"
            className="w-full object-cover"
          />

          {/* Content Container */}
          <div className="max-w-5xl bg-white rounded-[50px] shadow-xl p-8 mx-auto -mt-10 relative z-10">
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              {recipe.title}
            </h2>

            {/* Description */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">Description</h3>
              <p className="text-gray-600 mt-2">{recipe.description}</p>
            </section>

            {/* Cultural Background */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Cultural Background
              </h3>
              <p className="text-gray-600 mt-2">{recipe.culturalBackground}</p>
            </section>

            {/* Ingredients */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">Ingredients</h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </section>

            {/* instructions */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">Instructions</h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </section>

            {/* Favorite Icon */}
          <button
            className="absolute top-4 right-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-red-500 hover:text-red-600"
            aria-label="Add to Favorites"
          >
            ❤️
          </button>
          </div>
        </div>


    </main>
  </div>

  );
}
