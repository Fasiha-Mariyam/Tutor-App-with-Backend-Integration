import { useLocation } from "react-router-dom";
import { logOut } from "../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hideNavBarPaths = ["/signUp", "/"];

  const getRole = (path) => {
    if (path.startsWith("/student")) {
      return "student";
    } else if (path.startsWith("/teacher")) {
      return "teacher";
    } else if (path.startsWith("/admin")) {
      return "admin";
    }
  };
  
  // Determine the role based on the current location
  const role = getRole(location.pathname);

  const hideNavBar = hideNavBarPaths.includes(location.pathname);
  const handleLogout = async () => {
    await dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="layout">
      {!hideNavBar && (
        <>
          <SideBar logout={handleLogout} data={children} role={role}/>
        </>
      )}
      {hideNavBar && <main>{children}</main>}
    </div>
  );
};

export default Layout;
