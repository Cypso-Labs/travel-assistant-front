/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Recipe {
  name: string;
  cover_image: string;
  description: string;
  cultural_background: string;
  ingredients: string[];
  instructions: string[];
}

export default function RecipesPage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const recipeId = usePathname().split("/").pop();
  const router = useRouter();
  const [user, setUser] = useState<{
    user_id: number;
    access_token: string;
  } | null>(null);

  // Retrieve user data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("UserData");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  // Fetch recipe details and check saved status
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/recipes/${recipeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe data");
        }
        const data = await response.json();
        setRecipe(data.recipe);

        if (user) {
          const savedResponse = await fetch(
            `http://localhost:5000/api/v1/users/${user.user_id}/recipes`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${user.access_token}`,
              },
            }
          );

          if (savedResponse.ok) {
            const savedData = await savedResponse.json();
            const isRecipeSaved = savedData.recipes.some(
              (r: { id: number }) => r.id === Number(recipeId)
            );
            setIsFavorited(isRecipeSaved);
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId, user]);

  // Handle save/unsave logic
  const handleFavoriteClick = async () => {
    if (!user) {
      Swal.fire({
        title: "Please log in",
        text: "To save recipes, you need to log in.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Log In",
        cancelButtonText: "Discard",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/account/sign-in");
        }
      });
      return;
    }

    try {
      if (isFavorited) {
        // Unsave the recipe
        await fetch(
          `http://localhost:5000/api/v1/users/${user.user_id}/recipes/${recipeId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
      } else {
        // Save the recipe
        const response = await fetch(
          `http://localhost:5000/api/v1/users/${user.user_id}/recipes/${recipeId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (response.status === 422||response.status === 401) {
          Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "error",
            confirmButtonText: "Log In",
          }).then(() => {
            router.push("/account/sign-in");
          });
          return;
        }
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while updating favorites.",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>No recipe data available.</div>;
  }

  return (
    <div className="bg-gray-50 pt-24">
      <main className="container mx-auto mt-10 px-4 pb-10">
        <div className="flex">
          <button
            className="bg-black text-white px-2 rounded hover:bg-red-600 transition duration-200 mr-10"
            onClick={() => router.push("/recipesPage")}
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
          <Image
            src={recipe.cover_image}
            alt={recipe.name}
            className="w-50 h-50 object-cover rounded-lg shadow-lg"
            width={700}
            height={600}
          />
          <div className="max-w-5xl bg-white rounded-[50px] shadow-xl p-8 mx-auto -mt-10 relative z-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              {recipe.name}
            </h2>
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Description
              </h3>
              <p className="text-gray-600 mt-2">{recipe.description}</p>
            </section>
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Cultural Background
              </h3>
              <p className="text-gray-600 mt-2">{recipe.cultural_background}</p>
            </section>
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Ingredients
              </h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </section>
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Instructions
              </h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </section>

            <button
              className={`absolute top-4 right-4 p-3 rounded-full bg-white shadow-lg ${
                isFavorited
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-400 hover:text-gray-500"
              }`}
              aria-label="Add to Favorites"
              onClick={handleFavoriteClick}
            >
              {isFavorited ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}