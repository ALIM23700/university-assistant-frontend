import React, { useEffect, useState } from "react";

const ClassTest = () => {
  const [classtest, setClasstest] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://university-assistant-backend.onrender.com/api/getclasstest", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setClasstest(data.newgetclasstest))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Upcoming Class Tests
      </h1>

      <div className="flex flex-wrap justify-center gap-6 px-4">
        {classtest.map((post) => (
          <div
            key={post._id}
            className="flex flex-col justify-center items-center border border-gray-300 bg-white rounded-lg shadow-md w-72 p-4 hover:shadow-lg transition-all"
          >
            <p className="text-lg font-medium text-gray-800">
              Subject: {post.SubjectName}
            </p>
            <p className="text-gray-700 mt-2">Topic: {post.TopicName}</p>
            <p className="text-gray-700 mt-2">Department: {post.Department}</p>
            <p className="text-gray-700 mt-2">Batch: {post.Batch}</p>
            <p className="text-gray-700 mt-2">Time: {post.Time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassTest;
