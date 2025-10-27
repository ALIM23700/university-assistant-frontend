import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Admin = () => {
  const navigate = useNavigate();

  // ==== Role-based Auth Check ====
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert("Access denied. Admins only!");
      navigate("/login");
    }
  }, [navigate]);

  // ==== Class Schedule State ====
  const [classes, setClasses] = useState([]);
  const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  useEffect(() => {
  const fetchClasses = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/today");
      const data = await res.json();
      setClasses(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchClasses();
}, []);

const handleApprove = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/approve/${id}`, {
      method: "PUT",
    });
    const data = await res.json();
    setClasses(classes.map((c) => (c._id === id ? data : c)));
  } catch (err) {
    console.log(err);
  }
};

const handleCancel = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/cancel/${id}`, {
      method: "PUT",
    });
    const data = await res.json();
    setClasses(classes.map((c) => (c._id === id ? data : c)));
  } catch (err) {
    console.log(err);
  }
};



  // ==== ClassTest State ====
  const [SubjectName, setSubjectName] = useState("");
  const [TopicName, setTopicName] = useState("");
  const [Department, setDepartment] = useState("");
  const [Batch, setBatch] = useState("");
  const [Time, setTime] = useState("");
  const [classtest, setClasstest] = useState([]);
  const [editClassId, setEditClassId] = useState(null);

  // ==== Assignment State ====
  const [AssignSubject, setAssignSubject] = useState("");
  const [AssignTopic, setAssignTopic] = useState("");
  const [AssignDepartment, setAssignDepartment] = useState("");
  const [AssignBatch, setAssignBatch] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [AssignTime, setAssignTime] = useState("");
  const [assignment, setAssignment] = useState([]);
  const [editAssignId, setEditAssignId] = useState(null);

  // ==== Routine State ====
  const [RoutineImage, setRoutineImage] = useState("");
  const [routine, setRoutine] = useState([]);
  const [editRoutineId, setEditRoutineId] = useState(null);

  const token = localStorage.getItem("token"); // JWT token

  // ==== Fetch Functions ====
  const fetchClassTest = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/getclasstest", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setClasstest(data.newgetclasstest || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAssignment = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/getassignment", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAssignment(data.newgetassignment || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRoutine = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/getroutine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRoutine(data.newroutine || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClassTest();
    fetchAssignment();
    fetchRoutine();
  }, []);

  // ==== Handle Create/Update Functions ====
  const handleClassTestSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editClassId
        ? `http://localhost:3000/api/updateclasstest/${editClassId}`
        : "http://localhost:3000/api/classtest";
      const method = editClassId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ SubjectName, TopicName, Department, Batch, Time }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(editClassId ? "Updated Successfully" : "Created Successfully");
        setSubjectName("");
        setTopicName("");
        setDepartment("");
        setBatch("");
        setTime("");
        setEditClassId(null);
        fetchClassTest();
      } else {
        alert(data.message || "Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editAssignId
        ? `http://localhost:3000/api/updateassignment/${editAssignId}`
        : "http://localhost:3000/api/assignment";
      const method = editAssignId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          SubjectName: AssignSubject,
          TopicName: AssignTopic,
          Department: AssignDepartment,
          Batch: AssignBatch,
          Deadline,
          Time: AssignTime,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(editAssignId ? "Updated Successfully" : "Created Successfully");
        setAssignSubject("");
        setAssignTopic("");
        setAssignDepartment("");
        setAssignBatch("");
        setDeadline("");
        setAssignTime("");
        setEditAssignId(null);
        fetchAssignment();
      } else {
        alert(data.message || "Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoutineSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editRoutineId
        ? `http://localhost:3000/api/deleteroutine/${editRoutineId}`
        : "http://localhost:3000/api/routine";
      const method = editRoutineId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image: RoutineImage }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(editRoutineId ? "Updated Successfully" : "Created Successfully");
        setRoutineImage("");
        setEditRoutineId(null);
        fetchRoutine();
      } else {
        alert(data.message || "Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ==== Edit Handlers ====
  const editClass = (post) => {
    setSubjectName(post.SubjectName);
    setTopicName(post.TopicName);
    setDepartment(post.Department);
    setBatch(post.Batch);
    setTime(post.Time);
    setEditClassId(post._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editAssignment = (post) => {
    setAssignSubject(post.SubjectName);
    setAssignTopic(post.TopicName);
    setAssignDepartment(post.Department);
    setAssignBatch(post.Batch);
    setDeadline(post.Deadline);
    setAssignTime(post.Time);
    setEditAssignId(post._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editRoutine = (post) => {
    setRoutineImage(post.image);
    setEditRoutineId(post._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ==== Delete Handlers ====
  const deleteClass = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await fetch(`http://localhost:3000/api/deleteclasstest/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchClassTest();
  };

  const deleteAssignment = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await fetch(`http://localhost:3000/api/deleteassignment/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAssignment();
  };

  const deleteRoutine = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await fetch(`http://localhost:3000/api/deleteroutine/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchRoutine();
  };

  return (
    <div className="p-5">

   <div className="p-6 mb-10">
  <h1 className="text-2xl font-bold mb-4 text-center">Today's Classes</h1>
  {classes.length > 0 ? (
    <ul>
      {classes.map((c) => (
        <li
          key={c._id}
          className="flex justify-between items-center border p-2 my-1 rounded shadow-sm bg-white"
        >
          <span>
            {c.day} - {c.subject} - {c.department} - {c.place} - {c.time}
          </span>

          {c.approved ? (
            <button
              onClick={() => handleCancel(c._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => handleApprove(c._id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Approve
            </button>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 italic">No classes scheduled for today.</p>
  )}
</div>

      {/* ===== ClassTest Form & List ===== */}
      <form
        onSubmit={handleClassTestSubmit}
        className="border p-5 mb-10 bg-gray-100 rounded-md w-96 mx-auto shadow-md"
      >
        <h2 className="text-xl font-bold mb-3">
          {editClassId ? "Update ClassTest" : "Create ClassTest"}
        </h2>
        <input
          placeholder="Subject"
          value={SubjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          placeholder="Topic"
          value={TopicName}
          onChange={(e) => setTopicName(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          placeholder="Department"
          value={Department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          placeholder="Batch"
          value={Batch}
          onChange={(e) => setBatch(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          placeholder="Time"
          value={Time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          {editClassId ? "Update" : "Create"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2 text-center">Class Tests</h2>
      <div className="flex flex-wrap justify-center mb-10">
        {classtest.map((post) => (
          <div
            key={post._id}
            className="border p-4 m-2 w-80 rounded shadow-md bg-gray-100 flex flex-col justify-between"
          >
            <p>Subject: {post.SubjectName}</p>
            <p>Topic: {post.TopicName}</p>
            <p>Department: {post.Department}</p>
            <p>Batch: {post.Batch}</p>
            <p>Time: {post.Time}</p>
            <div className="flex justify-between mt-3">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => editClass(post)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => deleteClass(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Assignment Form & List ===== */}
      <form
        onSubmit={handleAssignmentSubmit}
        className="border p-5 mb-10 bg-gray-100 rounded-md w-96 mx-auto shadow-md"
      >
        <h2 className="text-xl font-bold mb-3">
          {editAssignId ? "Update Assignment" : "Create Assignment"}
        </h2>
        <input
          placeholder="Subject"
          value={AssignSubject}
          onChange={(e) => setAssignSubject(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          placeholder="Topic"
          value={AssignTopic}
          onChange={(e) => setAssignTopic(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          placeholder="Department"
          value={AssignDepartment}
          onChange={(e) => setAssignDepartment(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          placeholder="Batch"
          value={AssignBatch}
          onChange={(e) => setAssignBatch(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          type="date"
          value={Deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <input
          placeholder="Time"
          value={AssignTime}
          onChange={(e) => setAssignTime(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          {editAssignId ? "Update" : "Create"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2 text-center">Assignments</h2>
      <div className="flex flex-wrap justify-center mb-10">
        {assignment.map((post) => (
          <div
            key={post._id}
            className="border p-4 m-2 w-80 rounded shadow-md bg-gray-100 flex flex-col justify-between"
          >
            <p>Subject: {post.SubjectName}</p>
            <p>Topic: {post.TopicName}</p>
            <p>Department: {post.Department}</p>
            <p>Batch: {post.Batch}</p>
            <p>Deadline: {post.Deadline}</p>
            <p>Time: {post.Time}</p>
            <div className="flex justify-between mt-3">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => editAssignment(post)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => deleteAssignment(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Routine Form & List ===== */}
      <form
        onSubmit={handleRoutineSubmit}
        className="border p-5 mb-10 bg-gray-100 rounded-md w-96 mx-auto shadow-md"
      >
        <h2 className="text-xl font-bold mb-3">
          {editRoutineId ? "Update Routine" : "Add Routine"}
        </h2>
        <input
          placeholder="Image URL"
          value={RoutineImage}
          onChange={(e) => setRoutineImage(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          {editRoutineId ? "Update" : "Add"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2 text-center">Routines</h2>
      <div className="flex flex-wrap justify-center mb-10">
        {routine.map((post) => (
          <div
            key={post._id}
            className="border p-4 m-2 w-80 rounded shadow-md bg-gray-100 flex flex-col justify-between"
          >
            <img src={post.image} alt="Routine" className="mb-2 rounded" />
            <div className="flex justify-between mt-3">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => editRoutine(post)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => deleteRoutine(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
