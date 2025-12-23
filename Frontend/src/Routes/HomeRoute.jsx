import { useContext } from "react";
import UserContext from "../context/UserContext";
import Home from "../components/Home/Home";
import DashboardHome from "../components/DashboardHome/DashboardHome";

const HomeRoute = () => {
  const { user } = useContext(UserContext);

  // login ke baad same "/" path pe dashboard
  return user ? <DashboardHome /> : <Home />;
};

export default HomeRoute;
