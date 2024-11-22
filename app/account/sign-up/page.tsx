import Image from "next/image";
import React from "react";
import googleIcon from "../../../public/images/icons/google_logo.png";
import Link from "next/link";

function SignUp() {
  return (
    <div className="h-full flex items-center">
      <form className="max-w-sm w-full mx-auto">
        <h1 className="text-[31px] font-[600] text-center mb-12">
          Create an account
        </h1>

        <div className="mb-5">
          <label
            htmlFor="name"
            className="ps-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            className="border border-[#D0D5DD] text-gray-900 text-[16px] rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="ps-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            className="border border-[#D0D5DD] text-gray-900 text-[16px] rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter your email "
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="ps-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password *
          </label>
          <input
            type="password"
            id="password"
            className="border border-[#D0D5DD] text-gray-900 text-[16px] rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Create password"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="repeat-password"
            className="ps-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password *
          </label>
          <input
            type="password"
            id="repeat-password"
            className="border border-[#D0D5DD] text-gray-900 text-[16px] rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Confirm new password"
            required
          />
        </div>

        <div className="flex justify-center mt-11 mb-6">
          <Link
            href="/account/profile-creation"
            className="w-2/3 text-white bg-[#1366D9] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[8px] text-[16px] px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get started
          </Link>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-2/3 flex gap-2 items-center justify-center text-[#000000] border border-[#C8C8C8] hover:shadow-inner focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[8px] text-[16px] px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <Image src={googleIcon} alt="google icon" />
            <span>Start with google</span>
          </button>
        </div>

        <div className="text-center mt-5">
          Already have an account ?
          <Link href="/account/sign-in" className="ps-3 text-[#1366D9] hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
