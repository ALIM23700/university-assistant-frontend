import React, { useEffect, useState } from "react";

const Assignment = () => {
  const [assignment, setAssignment] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/getassignment", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAssignment(data.newgetassignment);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-center flex-col sm:flex">Upcoming Assignment</h1>
      {assignment.map((post) => (
        <div
          key={post._id}
          className="flex flex-col justify-center shadow-gray-700 shadow-md m-5 items-center border border-gray-700 h-auto w-auto sm:w-96 p-3"
        >
          <p className="mt-5">Subject: {post.SubjectName}</p>
          <p className="mt-5">Topic: {post.TopicName}</p>
          <p className="mt-5">Department: {post.Department}</p>
          <p className="mt-5">Batch: {post.Batch}</p>
          <p className="mt-5">Deadline: {post.Deadline}</p>
          <p className="mt-5">Time: {post.Time}</p>
        </div>
      ))}
    </div>
  );
};

export default Assignment;
