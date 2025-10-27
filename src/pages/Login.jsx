import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://university-assistant-backend.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.dispatchEvent(new Event("login"));

        alert(`Login successful! Welcome ${data.user.name}`);
        navigate("/"); 
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-blue-400 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white h-auto w-auto rounded-md p-5 flex flex-col justify-center items-center"
      >
        <h1 className="text-2xl text-center mt-5">Login User</h1>

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

        <button
          type="submit"
          className="bg-blue-500 rounded-md p-2 w-52 text-white mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
