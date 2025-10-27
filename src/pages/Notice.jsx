import React, { useEffect, useState } from "react";

const Notice = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchApprovedClasses = async () => {
      try {
        const res = await fetch("https://university-assistant-backend.onrender.com/api/all"); 
        const data = await res.json();
   
        const approvedClasses = data.filter((c) => c.approved === true);
        setClasses(approvedClasses);
      } catch (err) {
        console.log(err);
      }
    };

    fetchApprovedClasses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Notice Board</h1>
      {classes.length > 0 ? (
        <ul>
          {classes.map((c) => (
            <li
              key={c._id}
              className="border p-2 my-1 rounded shadow-sm bg-white"
            >
              {c.day} - {c.subject} - {c.department} - {c.place} - {c.time}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No approved classes yet.</p>
      )}
    </div>
  );
};

export default Notice;
