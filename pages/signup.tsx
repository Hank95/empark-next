import Link from "next/link";
import type { NextPage } from "next";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { useRouter } from "next/router";

const Signup: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      router.push("/");
    } catch (e: any) {
      setError(e.message);
    }

    setLoading(false);
  };

  return (
    //   Signup Page
    <div className="flex flex-col w-1/2 m-auto shadow-lg items-stretch p-4 rounded-lg mt-20">
      <h1 className="text-center text-2xl font-bold text-gray-800">Signup</h1>
      <p className="text-center text-gray-600 m-2">
        Welcome, please sign up with your email you provided to EMPA and provide
        a password atleast 6 characters long.
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
        <label className="mt-4" htmlFor="passwordConfirm">
          Confirm Password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="border border-gray-400 p-2 rounded-lg"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          type="submit"
        >
          {loading ? "Loading..." : "Signup"}
        </button>
      </form>
      {error && <p className="text-bold text-red-500 text-2xl">{error}</p>}
      <hr className=" border-t-2 border-black m-8" />
      <p className="text-center">
        <Link href="/login">
          <a className="text-blue-500 bg-gray-200 hover:text-blue-700font-bold py-2 px-4 rounded-lg w-full">
            Login
          </a>
        </Link>
      </p>
    </div>
  );
};

export default Signup;
