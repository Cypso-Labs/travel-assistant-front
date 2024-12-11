"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios, { AxiosError } from "axios";

interface Recipe {
  id: number;
  name: string;
  description: string;
  cultural_background: string;
  cover_image: string;
  ingredients: string[];
  instructions: string[];
}


export default function Home() {

  const [allRecipes, setAllRecipes] = useState<Recipe[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/recipes');
        if (response.status === 200) {
          console.log(response.data);
          setAllRecipes(response.data.recipes);
          setIsLoading(false);
        }
      } catch (error) {
        const err = error as AxiosError;
        console.log(err);
        setIsLoading(false);
      }
    }


    fetchAllRecipes();

  }, []);

  const router = useRouter();

  const handleNavigate = () => {
    router.push("/recipesPage"); // Navigate to the recipesPage
  };


  return (
    (!isLoading &&
      <div className="bg-gray-100 min-h-screen">
        {/* Main Container */}
        <div className="container mx-auto py-16 px-6 pt-32">
          <button
            className="bg-black text-white px-2 rounded hover:bg-red-600 transition duration-200"
            onClick={handleNavigate} // Add onClick to navigate to recipesPage
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






          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-12 pt-5">
            Flavors of Sri Lanka
          </h1>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            {allRecipes && allRecipes.length !== 0 ? (allRecipes?.map((recipe) =>
            (<div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={recipe.cover_image} // Replace with your image
                  alt={recipe.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4">
                  {recipe.cultural_background}
                </p>
                <Link
                  href={`recipeFlavors/${recipe.id}`}
                  className="text-green-600 font-semibold hover:underline"
                >
                  Learn More....
                </Link>
              </div>
            </div>)))
              :
              <div className="col-span-3 w-full flex justify-center items-center h-32">
                <p className="font-poppins text-2xl font-semibold">No recipes found!</p>
              </div>
            }

          </div>
        </div>

      </div>)
  );
}
