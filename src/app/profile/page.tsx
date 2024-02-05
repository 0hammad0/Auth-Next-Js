"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const promiseNotify = () =>
    toast.promise(logout(), {
      loading: "Logging out...",
      success: "Logged out successful!",
      error: "An error occurred during logging out.",
    });

  const promiseNotifyGetUserDetail = () =>
    toast.promise(getUserDetails(), {
      loading: "Getting user details",
      success: "Got the details successful!",
      error: "An error occurred during getting details.",
    });

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      throw new Error("An error occurred during login.");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/userDetail");
      setData(res.data.data._id);
    } catch (error) {
      throw new Error("An error occurred during getting details.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={promiseNotify}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={promiseNotifyGetUserDetail}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        GetUser Details
      </button>
    </div>
  );
}
