import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const UserModal = ({ id, onClose, message}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose(id);
    }, 15000); 

    return () => clearTimeout(timeout);
  }, [id, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center"
      initial={{ y: "-100%" }}
      animate={{ y: isVisible ? "0%" : "100%" }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative bg-white rounded-lg shadow w-full max-w-md p-4 md:p-5">
        <button
          onClick={() => onClose(id)}
          type="button"
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          {message}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default UserModal;
