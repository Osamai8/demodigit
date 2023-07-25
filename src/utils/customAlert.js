import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const customAlert = (title, onClick) => {
  confirmAlert({
    title: title,
    buttons: [
      {
        label: "Yes",
        onClick: onClick,
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
  });
};
