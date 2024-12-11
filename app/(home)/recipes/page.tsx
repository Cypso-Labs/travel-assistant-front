"use client";

import router from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function RecipesPage() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recipe, setRecipe] = useState<any>(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(true);
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/recipes/1");
        if (!response.ok) {
          throw new Error("Failed to fetch recipe data");
        }
        const data = await response.json();
        setRecipe(data.recipe);
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
  }, []);

  const handleNavigate = () => {
    router.push("/");
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
            onClick={handleNavigate}
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
            src={recipe.cover_image}
            alt={recipe.name}
            className="w-full object-cover"
            width={800}
            height={400}
          />

          <div className="max-w-5xl bg-white rounded-[50px] shadow-xl p-8 mx-auto -mt-10 relative z-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              {recipe.name}
            </h2>

            {/* Description */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Description
              </h3>
              <p className="text-gray-600 mt-2">{recipe.description}</p>
            </section>

            {/* Cultural Background */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Cultural Background
              </h3>
              <p className="text-gray-600 mt-2">{recipe.cultural_background}</p>
            </section>

            {/* Ingredients */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Ingredients
              </h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {recipe.ingredients.map((ingredient: string | number | bigint | boolean | React.ReactElement<never, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Instructions
              </h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {recipe.instructions.map((instruction: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </section>

            <button
              className={`absolute top-4 right-4 p-3 rounded-full bg-white shadow-lg ${
                isFavorited
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-red-500 hover:text-red-600"
              }`}
              aria-label="Add to Favorites"
              onClick={handleFavoriteClick}
              disabled={isFavorited}
            >
              {isFavorited ? "🤍" : "❤️"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
