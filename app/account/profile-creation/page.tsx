import Image from "next/image";
import React from "react";
import icon from "../../../public/images/icons/empty-image.png";
import ToggleButton from "@/app/components/toggle-button";
// import { Calender } from "../../../../public/SVG";

function ProfileCreationPage() {
  return (
    <div className="h-[1024px] overflow-y-auto py-10">
      <div className="max-w-sm w-full mx-auto">
        <h1 className="text-[31px] font-[600]  mb-12">
          Let&apos;s create your profile
        </h1>

        <form className="space-y-7 mb-5">
          <div className="flex justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex items-center justify-center rounded-full h-[285px] w-[285px] cursor-pointer hover:bg-[#b8b6b6] bg-[#D9D9D9] dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500"
            >
              <div>
                <Image src={icon} alt="Empty image icon" />
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <div>
            <label
              htmlFor="firstName"
              className="ps-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Frist Name *
            </label>
            <input
              type="text"
              id="firstName"
              className="border border-[#D0D5DD] text-gray-900 text-[16px] rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="ps-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              className="border border-[#D0D5DD] text-gray-900 text-[16px] rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="ps-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Birth Day *
            </label>

            <div className="relative">
              <input
                type="date"
                className="border border-[#D0D5DD] text-gray-900 text-[16px] rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Select date"
              />

              {/* <div className="absolute inset-y-3 start-[345px] text-[#C8C8C8] flex items-center hover:cursor-pointer hover:text-black">
              <Calender />
            </div> */}
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-number"
              className="ps-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contact Number *
            </label>
            <input
              type="tel"
              id="contact-number"
              className="border border-[#D0D5DD] text-gray-900 text-[16px] rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter your contact number "
              required
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="ps-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country Of Orgin *
            </label>
            <input
              type="text"
              id="country"
              className="border border-[#D0D5DD] text-gray-900 text-[16px] rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter your contact number "
              required
            />
          </div>

          <div className="flex gap-7">
            <div className="flex-grow">
              <label
                htmlFor="address"
                className="ps-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address *
              </label>
              <input
                type="text"
                id="address"
                className="border border-[#D0D5DD] text-gray-900 text-[16px] rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter your address"
                required
              />
            </div>

            <div>
              <label
                htmlFor="postal-zip"
                className="ps-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Postal\Zip *
              </label>
              <input
                type="text"
                id="postal-zip"
                className="border border-[#D0D5DD] text-gray-900 text-[16px] rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter your postal code"
                required
              />
            </div>
          </div>
        </form>

        <div className="mt-7">
          <h1 className="text-[20px] font-[600] mb-5">
            Tell us what you love.......
          </h1>

          <div className="flex flex-wrap">
            <ToggleButton name="Adventure" />
            <ToggleButton name="Natural" />
            <ToggleButton name="Religious" />
            <ToggleButton name="Mountain" />
            <ToggleButton name="Wildlife" />
            <ToggleButton name="Hestory" />
            <ToggleButton name="Beach" />
            <ToggleButton name="Adventure" />
          </div>
        </div>

        <div className="flex justify-end mt-20 mb-5">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-[600] rounded-lg text-[16px] px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCreationPage;
