import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React from "react";

function SignIn() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-[31px] font-[600] text-center">
          Log in to your account
        </h1>

        <p className="text-center text-[16px] font-[700] text-[#5D5D5D] mt-1">
          Welcome back! Please enter your details
        </p>

        <form className="space-y-5 max-w-sm mx-auto mt-12">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email *" />
            </div>
            <TextInput
              id="email1"
              className="bg-white"
              type="email"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password *" />
            </div>
            <TextInput
              id="password1"
              type="password"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember for 30 days</Label>
          </div>

          <div className="flex justify-center">
            <Button type="button" className="bg-[#1366D9] w-2/3">
              Log in
            </Button>
          </div>
        </form>

        <div className="text-center mt-5">
          Dont have an account ?
          <Link
            href="/account/sign-up"
            className="ps-3 text-[#1366D9] hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
