// StudentRoutes.js
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../pages/StudentMainFlow/Dashboard/Dashboard";
import TeacherProposals from "../pages/StudentMainFlow/Proposals/TeacherProposals";
import RequestForm from "../pages/StudentMainFlow/Requests/RequestForm";
import AllRequests from "../pages/StudentMainFlow/Requests/AllRequests";
import Connection from "../pages/StudentMainFlow/Connections/Connection";

export default function StudentRoutes() {
  return (
    <Routes>
      <>
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/teacherProposals" element={<TeacherProposals />} />
        <Route path="/createRequest" element={<RequestForm/>} />
        <Route path="/allRequests" element={<AllRequests />} />
        <Route path="/allConnections" element={<Connection />} />
      </>
    </Routes>
  );
}

