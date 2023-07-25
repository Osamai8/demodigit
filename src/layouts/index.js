import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./DashboardLayout.css";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="dLayoutWrapper">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
