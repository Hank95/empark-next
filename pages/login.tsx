import Link from "next/link";
import type { NextPage } from "next";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const router = useRouter();
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      // router.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  };

  return (
    //   Login Page
    <div className="flex flex-col w-1/2 m-auto shadow-lg items-stretch p-4 rounded-lg mt-20">
      <h1 className="text-center text-2xl font-bold text-gray-800">Login</h1>
      <p className="text-center text-gray-600 m-2">
        Welcome, please sign in with the email that you recived your invitation
        with.
      </p>
      <form className="flex flex-col w-full space-y-3" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 p-2 rounded-lg"
        />
        <label className="mt-4" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-400 p-2 rounded-lg"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        {error && <p className="text-bold text-red-500 text-2xl">{error}</p>}
      </form>
      <hr className=" border-t-2 border-black m-8" />
      <p className="text-center">
        <Link href="/signup">
          <a className="text-blue-500 bg-gray-200 hover:text-blue-700font-bold py-2 px-4 rounded-lg w-full">
            Sign Up
          </a>
        </Link>
      </p>
    </div>
  );
};

export default Login;
