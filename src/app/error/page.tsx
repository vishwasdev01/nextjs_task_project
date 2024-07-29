'use client'

import { motion } from 'framer-motion'

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-300 to-blue-700">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-10 bg-white bg-opacity-30 rounded-xl shadow-xl"
      >
        <motion.h1
          whileHover={{ scale: 1.1 }}
          className="text-6xl font-bold text-gray-800 mb-4"
        >
          Oops!
        </motion.h1>
        <motion.p
          whileHover={{ scale: 1.1 }}
          className="text-2xl text-gray-700"
        >
          Something went wrong.
        </motion.p>
      </motion.div>
    </div>
  )
}

export default ErrorPage
