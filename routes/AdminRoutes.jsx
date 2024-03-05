// AdminRoutes.js
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminMainFlow/Dashboard/Dashboard";
import AllUsers from "../pages/AdminMainFlow/Users/AllUsers";
import AllTeachers from "../pages/AdminMainFlow/Teachers/AllTeachers";
import AllConnections from "../pages/AdminMainFlow/Commission/AllConnections";

export default function AdminRoutes() {
  return (
    <Routes>
      <>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/allStudents" element={<AllUsers/>} />
        <Route path="/allTeachers" element={<AllTeachers/>} />
        <Route path="/allConnections" element={<AllConnections />} />
      </>
    </Routes>
  );
}
