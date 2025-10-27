import React, { useEffect, useState } from "react";

const Routine = () => {
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/getroutine", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.newroutine);
        setRoutine(data.newroutine);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-center flex-col sm:flex">Class Routine</h1>
      {routine.map((post) => (
        <div className="h-auto w-96" key={post._id}>
          <img
            src={post.image}
            alt="Routine"
            className="h-full w-full object-contain mt-12 ml-12"
          />
        </div>
      ))}
    </div>
  );
};

export default Routine;
