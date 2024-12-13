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
  const [isStatusChanging, setIsStateChanging] = useState(false);
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
        setIsStateChanging(true);

        const response = await fetch(
          `http://localhost:5000/api/v1/users/${user.user_id}/recipes/${recipeId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (response.ok) {
          showToast("Removed from My RecipeBox!");
        }
      } else {

        setIsStateChanging(true);
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

        if (response.ok) {
          showToast("Recipe added successfully!");
        }

        if (response.status === 422 || response.status === 401) {
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
      setIsStateChanging(false)
      setIsFavorited(!isFavorited);
    } catch (error) {
      setIsStateChanging(false)
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

  if (!document.getElementById("toast-container")) {
    const toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.style.position = "fixed";
    toastContainer.style.top = "1rem";
    toastContainer.style.right = "1rem";
    toastContainer.style.zIndex = "9999"; 
    document.body.appendChild(toastContainer);
  }

  const showToast = (message: string) => {
    const toastContainer = document.getElementById("toast-container");

    if (!toastContainer) {
      console.error("Toast container not found!");
      return;
    }

    const toast = document.createElement("div");
    toast.className =
      "flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800";
    toast.setAttribute("role", "alert");

    toast.innerHTML = `
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
          <span class="sr-only">Check icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">${message}</div>
      <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
      </button>
    `;

    // Append toast to the top-right container
    toastContainer.appendChild(toast);

    // Remove the toast after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };



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
          <div
            style={{
              width: '100%',
              height: '50vh',
              position: 'relative',
            }}
          >
            <Image
              src={recipe.cover_image}
              alt={recipe.name}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>

          <div className="max-w-5xl bg-white rounded-[50px] shadow-xl p-8 mx-auto -mt-10 relative z-10">
            <h2 className="text-[28px] sm:text-3xl font-bold text-gray-800 mb-4 text-center">
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
              disabled={isStatusChanging}
              className={`absolute top-4 right-4 p-3 rounded-full ${isStatusChanging ? 'cursor-wait' : 'cursor-pointer'} bg-white shadow-lg ${isFavorited
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