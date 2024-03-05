import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UnProtectedRoutes = ({ Component }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        if (userData.userType === "student") {
          navigate("/student/dashboard");
        } else if (userData.userType === "teacher") {
          navigate("/teacher/dashboard");
        } else if (userData.userType === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
      setLoader(false);
    })();
  }, [navigate]);

  return <div>{loader ? <></> : <Component />}</div>;
};

export default UnProtectedRoutes;
