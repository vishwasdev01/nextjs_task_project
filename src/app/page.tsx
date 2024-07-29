'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        className="bg-slate-300/5 w-[40vw] text-center rounded-xl p-11 shadow-xl"
      >
        <motion.h1 className="text-white text-2xl">
          Welcome to Our Website!
        </motion.h1>
        <motion.p className="text-white text-2xl">
          We're glad to have you here. Explore and enjoy!
        </motion.p>
        <Link href="dashboard">
          <motion.p
            className="bg-gradient-to-r from-cyan-500 to-blue-500 px-[1.5rem] py-[0.75rem] inline-block mt-5 rounded-lg text-white"
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.9 }}
          >
            Go to Dashboard
          </motion.p>
        </Link>
      </motion.div>
    </div>
  )
}

export default HomePage
