import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Features from "./pages/Features";
import ClassTest from "./pages/ClassTest";
import Assignment from "./pages/Assignment";
import Routine from "./pages/Routine";
import Resources from "./pages/Resources";
import Cgpa_Calculator from "./pages/Cgpa_Calculator";
import Admin from "./pages/AdMIN.JSX";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Notice from "./pages/Notice";
import Nav from "./components/Nav";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/features"
          element={
            <PrivateRoute>
              <Features />
            </PrivateRoute>
          }
        />
        <Route
          path="/classtest"
          element={
            <PrivateRoute>
              <ClassTest />
            </PrivateRoute>
          }
        />
        <Route
          path="/assignment"
          element={
            <PrivateRoute>
              <Assignment />
            </PrivateRoute>
          }
        />
        <Route
          path="/routine"
          element={
            <PrivateRoute>
              <Routine />
            </PrivateRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <PrivateRoute>
              <Resources />
            </PrivateRoute>
          }
        />
        <Route
          path="/cgpa"
          element={
            <PrivateRoute>
              <Cgpa_Calculator />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/notice"
          element={
            <PrivateRoute>
              <Notice />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
