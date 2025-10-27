import React from 'react';
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div className="flex justify-center px-4">
      <div className="flex flex-col border border-gray-700 shadow-md shadow-gray-700 mt-24 mb-12 p-6 sm:p-12 rounded-md w-full max-w-md text-lg sm:text-2xl items-center">
        
        <Link to="/classtest" className="w-full text-center mt-3 sm:mt-5 bg-blue-500 text-white py-2 sm:py-3 rounded-md hover:bg-blue-600 transition">
          See Upcoming ClassTest
        </Link>

        <Link to="/assignment" className="w-full text-center mt-3 sm:mt-5 bg-blue-500 text-white py-2 sm:py-3 rounded-md hover:bg-blue-600 transition">
          Upcoming Assignment
        </Link>

        <Link to="/routine" className="w-full text-center mt-3 sm:mt-5 bg-blue-500 text-white py-2 sm:py-3 rounded-md hover:bg-blue-600 transition">
          See Upcoming Routine
        </Link>

        <Link to="/resources" className="w-full text-center mt-3 sm:mt-5 bg-blue-500 text-white py-2 sm:py-3 rounded-md hover:bg-blue-600 transition">
          See Resources
        </Link>

        <Link to="/cgpa" className="w-full text-center mt-3 sm:mt-5 bg-blue-500 text-white py-2 sm:py-3 rounded-md hover:bg-blue-600 transition">
          Calculate your CGPA
        </Link>

        <Link to="/notice" className="w-full text-center mt-3 sm:mt-5 bg-blue-500 text-white py-2 sm:py-3 rounded-md hover:bg-blue-600 transition">
          See Your Class Notice
        </Link>

      </div>
    </div>
  );
};

export default Features;
