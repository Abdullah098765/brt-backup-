import React from 'react'
import { motion } from 'framer-motion';
import logo from "../../../public/assets/logo.png";
import Image from 'next/image';
import Link from 'next/link';
const variants = {
      hidden: { opacity: 0, x: "75px" },
      visible: { opacity: 1, x: 0 },
};
export default function VerifiedButNotLoggedIn() {
      return (
            <div>
                  <div className="flex flex-col items-center justify-center h-screen">
                        <Image
                              src={logo}
                              width={100}
                              height={100}
                              alt="google"
                              className="mb-7"
                        />
                        <h1 className="text-3xl font-bold mb-4 text-white">Account Verified</h1>
                        <p className="text-white text-center mb-8">
                              Your account has been verified but you are not logged in.<br /><br />
                              Please login to complete your profile and start participating in challenges.
                        </p>
                        <Link
                              href="/login"
                              className='rounded-xl px-6 py-3 mb-4 btn-blue white-text text-xl flex justify-center items-center text-center border border-[#ccc] font-semibold hover:brightness-150'
                        >
                              Login
                        </Link>
                  </div>

            </div>
      )
}
