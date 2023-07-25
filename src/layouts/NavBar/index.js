// import { Avatar } from "@material-ui/core";
import "./index.css";
import NavItem from "./NavItem";
import { navData } from "./NavData";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navWrapper">
      {/* <div style={{ height: "10px", width: "auto", margin: "1rem 2rem" }}>
        <img src="https://cdn.jsdelivr.net/npm/@egovernments/digit-ui-css/img/browser-icon.png" alt="" />
      </div> */}
      <div className="navInner">
        <NavItem items={navData} />
      </div>
    </div>
  );
};

export default Navbar;
