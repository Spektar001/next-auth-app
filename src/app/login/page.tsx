"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", { email, password, callbackUrl: "/info" });

    setLoginInProgress(false);
  };

  return (
    <div>
      <form
        className="max-w-md mx-auto p-4 bg-white rounded-md"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-center text-4xl mb-4">Login</h1>
        <input
          type="email"
          disabled={loginInProgress}
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          disabled={loginInProgress}
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loginInProgress} type="submit">
          Login
        </button>
        <p className="flex items-center gap-4 my-4 text-center text-gray-500">
          <span className="flex-grow h-px bg-gray-200"></span>
          or
          <span className="flex-grow h-px bg-gray-200"></span>
        </p>
        <button
          type="button"
          className="flex justify-center gap-4"
          onClick={() => signIn("google", { callbackUrl: "/info" })}
        >
          <Image src={"/google.png"} alt="google" width={24} height={24} />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          No account?{" "}
          <Link className="group" href={"/registration"}>
            Registration
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
              &raquo;
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
