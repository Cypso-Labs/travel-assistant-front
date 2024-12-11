"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from 'next/navigation'


const Page = () => {
  const pathname = usePathname()

  console.log(pathname)
  return (
    <div className="w-full h-full fixed top-0 left-0 pt-24">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="bg-black opacity-40 w-full h-full absolute left-0 top-0"></div>
        <div className="relative w-1/2 aspect-[897/698] bg-white rounded-xl min-w-[95%] min-h-[95%] max-h-[95%] overflow-y-auto">
          <div className="relative w-full h-[55%] flex-grow rounded-t-xl bg-black">
            <Image
              src="/images/2.png"
              alt=""
              layout="fill"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="absolute w-full h-[50%] bg-white top-[50%] left-0 rounded-xl p-6">
            <h1 className="text-[25px] font-bold">
              Poson-Poya Thorana (Religon)
            </h1>
            <h1 className="text-[16px] font-bold pb-6">
              2025/06/1 - 2025/06/01
            </h1>
            <p className="text-sm font-normal">
              <span className="relative mb-4 block">
                Poson Poya Thorana are magnificent illuminated displays that are
                a key highlight of the Poson Poya festival in Sri Lanka.
                Celebrated in June, Poson Poya commemorates the introduction of
                Buddhism to the island by Arahant Mahinda. Thoranas are large,
                decorative panels adorned with vibrant lights, intricate
                artwork, and vivid storytelling. They often depict significant
                scenes from Buddhist teachings, such as the life of the Buddha,
                Jataka tales, or the story of Arahant Mahinda’s arrival.
              </span>
              <span className="relative">
                These stunning structures are crafted with immense creativity
                and dedication, becoming a focal point in towns and villages
                during the festival. Poson Poya Thoranas not only add color and
                splendor to the celebrations but also serve as a medium to
                convey moral and spiritual lessons, bringing communities
                together in reflection and festivity.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
