// TeacherRoutes.js
import { Routes, Route } from "react-router-dom";
import TeacherDashboard from "../pages/TeacherMainFlow/Dashboard/Dashboard";
import AllProposals from "../pages/TeacherMainFlow/Proposals/AllProposals";
import StudentsRequests from "../pages/TeacherMainFlow/Requests/StudentsRequests";
import Connections from "../pages/TeacherMainFlow/Connection/Connections";

export default function TeacherRoutes() {
  return (
    <Routes>
      <>
        <Route path="/dashboard" element={<TeacherDashboard />} />
        <Route path="/allProposals" element={<AllProposals />} />
        <Route path="/Connections" element={<Connections/>} />
        <Route path="/StudentRequests" element={<StudentsRequests />} />
      </>
    </Routes>
  );
}
