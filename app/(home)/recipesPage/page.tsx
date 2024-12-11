"use client";

import React, { useEffect, useState } from "react";
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

  const [user, setUser] = useState<{ [key: string]: unknown }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("UserData");
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUserNotLogged(true);
      }
    }
  }, []);

  const [allRecipes, setAllRecipes] = useState<Recipe[] | null>(null);
  const [userRecipes, setUserRecipes] = useState<Recipe[] | null>(null);
  const [userNotLogged, setUserNotLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/recipes');
        if (response.status === 200) {
          console.log(response.data);
          setAllRecipes(response.data.recipes);
        }
      } catch (error) {
        const err = error as AxiosError;
        console.log(err);
      }
    }

    const fetchUserRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/users/${user.user_id}/recipes`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        if (response.status === 200) {
          const user_recipes = response.data.recipes;
          setUserRecipes(user_recipes);
          setIsLoading(false);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response && (err.response.status === 404)) {
          setUserRecipes(null);
        }
        if (err.response && (err.response.status === 401 || err.response.status === 422)) {
          setUserRecipes(null);
          setUserNotLogged(true);
        }
        setIsLoading(false);
      }
    };

    fetchAllRecipes();
    fetchUserRecipes();

  }, [user.access_token, user.user_id]);

  return (
    (!isLoading &&
      <div className="bg-gray-100 min-h-screen">
        {/* Main Container */}
        <div className="container mx-auto py-16 px-6 pt-40">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-12 ">
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
                  href={`recipes/${recipe.id}`}
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

          {/* View More Section */}
          <div className="mt-12">
            <Link
              href="recipeFlavors"
              className="text-black-600 font-semibold hover:underline block"
            >
              View More →
            </Link>
          </div>

          {!userNotLogged &&
            <div className="container mx-auto pt-10">
              <span className="block w-full sm:w-[500px] md:w-[800px] lg:w-[1500px] h-[10px] bg-green-500"></span>
            </div>}
        </div>



        {/* Main Container */}
        {!userNotLogged && <div className="container mx-auto py-16 px-6 ">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-12 ">
            My Recipe Box
          </h1>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            {userRecipes && userRecipes.length !== 0 ? (userRecipes?.map((recipe) =>
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
                  href={`recipes/${recipe.id}`}
                  className="text-green-600 font-semibold hover:underline"
                >
                  Learn More....
                </Link>
              </div>
            </div>)))
              :
              <div className="col-span-3 w-full flex justify-center items-center h-32">
                <p className="font-poppins text-2xl font-semibold">No Saved Recipes!</p>
              </div>
            }

          </div>

          {/* View More Section */}
          <div className="mt-12">
            <Link
              href="recipeBox"
              className="text-black-600 font-semibold hover:underline block"
            >
              View More →
            </Link>
          </div>


        </div>}

      </div>)
  );
}
