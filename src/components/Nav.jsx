import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleLoginEvent = () => {
      const u = localStorage.getItem("user");
      if (u) setUser(JSON.parse(u));
    };
    window.addEventListener("login", handleLoginEvent);

    return () => window.removeEventListener("login", handleLoginEvent);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "ClassTest", path: "/classtest" },
    { name: "Assignment", path: "/assignment" },
    { name: "Routine", path: "/routine" },
    { name: "Resources", path: "/resources" },
    { name: "Cgpa-cal", path: "/cgpa" },
    { name: "Notice", path: "/notice" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <div className="bg-gray-700 text-white">
      <div className="flex justify-between items-center h-16">
        <h1 className="ml-5 text-2xl">University Assistant</h1>

        <div className="hidden sm:flex space-x-5 items-center">
          {links.map((link) => (
            <Link key={link.name} to={link.path}>
              {link.name}
            </Link>
          ))}

          {!user && (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}

          {user && (
            <>
              <span>Hello, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <h1
          className="text-2xl sm:hidden mr-5 cursor-pointer"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? "✕" : "☰"}
        </h1>
      </div>

      {toggle && (
        <div className="flex flex-col sm:hidden bg-gray-800 p-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setToggle(false)}
            >
              {link.name}
            </Link>
          ))}

          {!user && (
            <>
              <Link to="/register" onClick={() => setToggle(false)}>
                Register
              </Link>
              <Link to="/login" onClick={() => setToggle(false)}>
                Login
              </Link>
            </>
          )}

          {user && (
            <>
              <span>Hello, {user.name}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setToggle(false);
                }}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
