"use client";

import React from "react";
import Link from "next/link";
import axios from "axios";

const registerUser = async (
  userDetails: Readonly<{ username: string; email: string; password: string }>
) => {
  axios
    .post("http://localhost:5000/api/v1/register", userDetails)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

function SignUp() {
  const user = { username: "", email: "", password: "" };

  return (
    <div className="h-full flex items-center">
      <form className="max-w-md w-full mx-auto px-10 py-24 rounded-[10px] bg-white">
        <h1 className="text-[31px] font-[600] text-center mb-12">
          Create an account
        </h1>

        <div className="mb-5">
          <label
            htmlFor="username"
            className="ps-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username *
          </label>
          <input
            type="text"
            id="username"
            className="border border-[#D0D5DD] text-gray-900 text-[16px] rounded-[8px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter your username"
            onChange={(e) => (user.username = e.target.value)}
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
            onChange={(e) => (user.email = e.target.value)}
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
            onChange={(e) => (user.password = e.target.value)}
            required
          />
        </div>

        <div className="flex justify-center mt-11 mb-6">
          <button
            type="button"
            onClick={() => registerUser(user)}
            className="w-2/3 text-white bg-[#1366D9] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[8px] text-[16px] px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get started
          </button>
        </div>

        <div className="text-center mt-5">
          Already have an account ?
          <Link
            href="/account/sign-in"
            className="ps-3 text-[#1366D9] hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
