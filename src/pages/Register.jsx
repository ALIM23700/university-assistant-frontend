import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, department }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert(`Registered successfully! Welcome ${data.user.name}`);
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-blue-400 flex justify-center items-center">
      <form
        onSubmit={handlesubmit}
        className="bg-white h-auto w-auto rounded-md p-5 flex flex-col justify-center items-center"
      >
        <h1 className="text-2xl text-center mt-5">Register User</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-700 p-2 rounded-md w-64 mt-4"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-700 p-2 rounded-md w-64 mt-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-700 p-2 rounded-md w-64 mt-4"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-700 p-2 rounded-md w-64 mt-4"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border border-gray-700 p-2 rounded-md w-64 mt-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 rounded-md p-2 w-52 text-white mt-4"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
