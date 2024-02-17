"use client";

import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  };

  return (
    <div>
      {userCreated && (
        <div className="my-4 text-center">
          User created.
          <br />
          Now you can{" "}
          <Link className="underline" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error has occurred.
          <br />
          Please try again later
        </div>
      )}
      <form
        className="block max-w-sm mx-auto p-4 bg-white rounded-md"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-center text-primary text-4xl mb-4">Registration</h1>
        <input
          type="email"
          placeholder="email"
          disabled={creatingUser}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          disabled={creatingUser}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={creatingUser} type="submit">
          Registration
        </button>
        <div className="text-center mt-8 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="group" href={"/login"}>
            Login
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
              &raquo;
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
