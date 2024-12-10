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
        <h1 className="text-4xl font-bold text-gray-800 mb-12">
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

           {/* Card 2 */}
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

           {/* Card 3 */}
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


           {/* Card 4 */}
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


           {/* Card 5 */}
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


           {/* Card 6 */}
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


           {/* Card 7 */}
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


           {/* Card 8 */}
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

           {/* Card 9 */}
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
        </div>
        </div>

    </div>
  );
}
