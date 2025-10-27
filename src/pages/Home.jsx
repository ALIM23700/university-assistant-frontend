import { Link } from "react-router-dom";
import bg from "../assets/hero2.jpg";

const Home = () => {
  return (
    <div
      className="h-screen w-full bg-center bg-cover flex flex-col justify-center items-center text-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
    
      <h1 className="text-blue-500 text-2xl sm:text-5xl font-bold mb-6">
        Welcome to University Assistant
      </h1>

     
      <Link
        to="/features"
        className="bg-blue-500 text-white rounded-md px-4 py-2 sm:px-8 sm:py-4 text-base sm:text-xl hover:bg-blue-600 transition"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;
