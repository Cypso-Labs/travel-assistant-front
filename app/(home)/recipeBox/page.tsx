"use client"; // Required for Next.js apps

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

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
  const router = useRouter();

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

  const [userRecipes, setUserRecipes] = useState<Recipe[] | null>(null);
  const [userNotLogged, setUserNotLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        if (typeof window !== "undefined") {
          const userData = localStorage.getItem("UserData");
          if (!userData) {
            Swal.fire({
              title: "Error",
              text: "Please login to continue.",
              icon: "warning",
              showCancelButton: false,
              confirmButtonText: "Go to Login",
              customClass: {
                confirmButton: "swal-login-button"
              }
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/account/sign-in");
              }
            });
          }
        }
        if (err.response && (err.response.status === 401 || err.response.status === 422)) {
          setUserRecipes(null);
          setUserNotLogged(true);
          Swal.fire({
            title: "Token Error",
            text: "Please login to continue.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: "Go to Login",
            customClass: {
              confirmButton: "swal-login-button"
            }
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/account/sign-in");
            }
          });
        }
        setIsLoading(false);
      }
    };

    fetchUserRecipes();

  }, [router, user.access_token, user.user_id]);

  const handleNavigate = () => {
    router.push("/recipesPage"); // Navigate to the recipesPage
  };

  return (
    ((!isLoading || !userNotLogged) &&
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
        </div>
      </div>)
  );
}
