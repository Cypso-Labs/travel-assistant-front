import Header from "@/app/components/Header";
import React from "react";

import Chicken_Image from "../../../public/images/Chicken.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
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
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={Chicken_Image} // Replace with your image
                alt="Sri Lankan Chicken Curry"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4">
                Sri Lankan Chicken Curry, or Kukul Mas Curry, is a rich and
                aromatic dish made with a blend of spices, coconut milk, and
                tender chicken, embodying the vibrant flavors of Sri Lankan
                cuisine.
              </p>
              <Link
                href="#"
                className="text-green-600 font-semibold hover:underline"
              >
                Learn More....
              </Link>
            </div>
          </div>

          {/* Duplicate Cards */}
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={Chicken_Image} // Replace with your image
                  alt="Sri Lankan Chicken Curry"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4">
                  Sri Lankan Chicken Curry, or Kukul Mas Curry, is a rich and
                  aromatic dish made with a blend of spices, coconut milk, and
                  tender chicken, embodying the vibrant flavors of Sri Lankan
                  cuisine.
                </p>
                <Link
                  href="#"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Learn More....
                </Link>
              </div>
            </div>
          ))}
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

        <div className="container mx-auto pt-10">
          <span className="block w-full sm:w-[500px] md:w-[800px] lg:w-[1500px] h-[10px] bg-green-500"></span>
        </div>
      </div>
            


      {/* Main Container */}
      <div className="container mx-auto py-16 px-6 ">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-12 ">
        My Recipe Box
        </h1>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={Chicken_Image} // Replace with your image
                alt="Sri Lankan Chicken Curry"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4">
                Sri Lankan Chicken Curry, or Kukul Mas Curry, is a rich and
                aromatic dish made with a blend of spices, coconut milk, and
                tender chicken, embodying the vibrant flavors of Sri Lankan
                cuisine.
              </p>
              <Link
                href="#"
                className="text-green-600 font-semibold hover:underline"
              >
                Learn More....
              </Link>
            </div>
          </div>

          {/* Duplicate Cards */}
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={Chicken_Image} // Replace with your image
                  alt="Sri Lankan Chicken Curry"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4">
                  Sri Lankan Chicken Curry, or Kukul Mas Curry, is a rich and
                  aromatic dish made with a blend of spices, coconut milk, and
                  tender chicken, embodying the vibrant flavors of Sri Lankan
                  cuisine.
                </p>
                <Link
                  href="#"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Learn More....
                </Link>
              </div>
            </div>
          ))}
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

        
      </div>

    </div>
  );
}
