import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import UnProtectedRoutes from "./UnProtectedRoutes";
import Login from "../pages/AuthFlow/Login/Login";
import Registration from "../pages/AuthFlow/SignUp/Registration";
import StudentRoutes from "./StudentRoutes";
import TeacherRoutes from "./TeacherRoutes";
import AdminRoutes from "./AdminRoutes";
import Layout from "../layout/Layout";
import PageNotFound from '../pages/ErrorPage/PageNotFound'

const RoutesIndex = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <>
            <Route path="/" element={<UnProtectedRoutes Component={Login} />} />
            <Route path="/signUp" element={<UnProtectedRoutes Component={Registration} />} />
            <Route path="/student/*" element={<ProtectedRoutes Component={StudentRoutes} />} />
            <Route path="/teacher/*" element={<ProtectedRoutes Component={TeacherRoutes} />} />
            <Route path="/admin/*" element={<ProtectedRoutes Component={AdminRoutes} />} />
            <Route path="*" element={<PageNotFound/>} />
          </>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default RoutesIndex;
