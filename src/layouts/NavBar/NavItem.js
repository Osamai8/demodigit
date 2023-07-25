import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "src/Redux/Auth/action";
import GoTo from "./GoTo";

const NavItem = ({ items }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    confirmAlert({
      title: "Are you sure you want to logout now?",
      // message: 'Are you sure to do this.',
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(logoutUser()),
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };

  return (
    <ul className="navItemsWrapper">
      {items.map((item) => (
        <GoTo key={item.id} item={item} />
      ))}

      <li className="navItems" onClick={handleLogout}>
        <div className="navContentsWrapper">
          <div className="navContents">
            <ExitToAppOutlinedIcon /> <span>Logout</span>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default NavItem;
