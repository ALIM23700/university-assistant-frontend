import React from 'react'
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div className='flex justify-center '>
      <div className='flex flex-col border border-gray-700 shadow-gray-700 shadow-md mt-24 mb-12 p-12 rounded-md w-auto sm:w-96 text-2xl justify-center items-center'>
         <Link to="/classtest" className='mt-5 bg-blue-500 text-white p-2 rounded-md'>See Upcoming ClassTest</Link>
          <Link to="/assignment" className='mt-5 bg-blue-500 text-white p-2 rounded-md'>Upcoming Assignment</Link>
          <Link to="/routine" className='mt-5 bg-blue-500 text-white p-2 rounded-md'>See Upcoming Routine</Link>
             <Link to="/resources" className='mt-5 bg-blue-500 text-white p-2 rounded-md'>See Resources</Link>
        
          <Link to="/cgpa" className='mt-5 bg-blue-500 text-white p-2 rounded-md'>Calculate your cgpa</Link>
          <Link to="/notice" className='mt-5 bg-blue-500 text-white p-2 rounded-md'>See your class Notice</Link>
        

      </div>
       
         
    
    </div>
  )
}

export default Features