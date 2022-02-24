import Link from "next/link";
import Head from "next/head";
import NavBar from "../../components/nav/navBar";
import type { NextPage } from "next";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "../../components/layout";

const Details: NextPage = () => {
  const { userInfo } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   // redirect to login if user is not logged in
  //   if (!userInfo) {
  //     router.push("/login");
  //   }
  // }, [userInfo, router]);

  // funtion to format phone number from string to string with dashes
  const formatPhone = (phone: string) => {
    let phoneFormatted = phone.replace(/[^\d]/g, "");
    if (phoneFormatted.length === 10) {
      phoneFormatted = `(${phoneFormatted.substring(
        0,
        3
      )}) ${phoneFormatted.substring(3, 6)}-${phoneFormatted.substring(6, 10)}`;
    }
    return phoneFormatted;
  };

  return (
    <Layout privateRoute={true} title="Member Details">
      <main className="mb-auto">
        <h1>Profile</h1>
        <p>Welcome, {userInfo?.firstName || "Guest"}</p>

        {/* Grid of user information */}
        <div className="grid grid-cols-2 gap-4 mx-auto w-3/4 sm:w-2/3 lg:w-1/2">
          <div className="bg-gray-100 p-4 rounded-lg col-span-2">
            <h2 className="text-xl font-bold text-gray-800">
              Personal Information
            </h2>
            <p className="text-gray-600 m-2">
              {userInfo?.firstName} {userInfo?.lastName}
            </p>
            <p className="text-gray-600 m-2">{userInfo?.email}</p>
            {userInfo?.emPhone && (
              <p className="text-gray-600 m-2">
                Eagles Mere Phone: {formatPhone(userInfo?.emPhone)}
              </p>
            )}
            {userInfo?.homePhone && (
              <p className="text-gray-600 m-2">
                Home Phone: {formatPhone(userInfo?.homePhone)}
              </p>
            )}
            {userInfo?.mobilePhone && (
              <p className="text-gray-600 m-2">
                Mobile Phone: {formatPhone(userInfo?.mobilePhone)}
              </p>
            )}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800">Home Address</h2>
            <p className="text-gray-600 m-2">{userInfo?.homeAddress1}</p>
            <p className="text-gray-600 m-2">{userInfo?.homeAddress2}</p>
            <p className="text-gray-600 m-2">
              {userInfo?.city}, {userInfo?.state} {userInfo?.zipCode}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800">Park Address</h2>
            <p className="text-gray-600 m-2">{userInfo?.parkCottageName}</p>
            <p className="text-gray-600 m-2">{userInfo?.emAddress}</p>
          </div>

          {/* Link to edit profile */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <Link href="/profile/edit">
              <a className="text-xl font-bold text-gray-800">Edit Profile</a>
            </Link>
          </div>

          {/* Link to change password */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <Link href="/profile/change-password">
              <a className="text-xl font-bold text-gray-800 hover:text-red-600">
                Change Password
              </a>
            </Link>
          </div>
        </div>

        {/* Link to logout */}
        <Link href="/profile/logout">
          <a className="text-gray-600 m-2">Logout</a>
        </Link>
      </main>
    </Layout>
  );
};

export default Details;
