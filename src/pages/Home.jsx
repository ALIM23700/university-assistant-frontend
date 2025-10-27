import { Link } from "react-router-dom"
import bg from "../assets/hero2.jpg"

const Home = () => {
  return (
    <div className="h-screen w-full bg-cover bg-no-repeat absulate   text-center" style={{backgroundImage:`url(${bg})`}}>
        <h1 className="text-blue-500 text-2xl font-bold sm:text-4xl relative top-56 sm:top-72">Welcome to university Assistant</h1>
        <Link to="/features"  className="text-blue-500 rounded-md border-white border bg-blue-500 text-white p-2 sm:p-3   relative top-60 sm:top-80">Get Started</Link>
     
       
    </div>
  )
}

export default Home