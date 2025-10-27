import React, { useEffect, useState } from "react";

const Routine = () => {
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://university-assistant-backend.onrender.com/api/getroutine", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.newroutine);
        setRoutine(data.newroutine);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-700">
        Class Routine
      </h1>

      <div className="flex flex-col items-center gap-6 w-full">
        {routine.map((post) => (
          <div key={post._id} className="w-full max-w-md sm:max-w-lg">
            <img
              src={post.image}
              alt="Routine"
              className="w-full h-auto object-contain rounded shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Routine;
