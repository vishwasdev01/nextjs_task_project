import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

interface ToastProps {
  message: string
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000) // Close toast after 3 seconds

    return () => clearTimeout(timer) // Clear timer if the component unmounts before timeout
  }, [onClose])

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        className="bg-red-500 text-white p-4 rounded-lg shadow-lg"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
        {message}
      </motion.div>
    </div>
  )
}

export default Toast
