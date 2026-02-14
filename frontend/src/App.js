import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import DonorRegister from "./pages/DonorRegister";
import RecipientRegister from "./pages/RecipientRegister";
import Emergency from "./pages/Emergency";
import Appointments from "./pages/Appointments";
import AdminDashboard from "./pages/AdminDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";

function App() {
  return (
    <Router>
      <Navbar /> {/* Common Navbar for all pages */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/inventory" element={<Inventory />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/appointments" element={<Appointments />} />

        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/recipient-register" element={<RecipientRegister />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;