import { Link } from "react-router-dom";
import "./index.css";

const CreateButton = ({ title, href }) => {
  return (
    <Link className="createButton" to={href}>
      {title}
    </Link>
  );
};

export default CreateButton;
