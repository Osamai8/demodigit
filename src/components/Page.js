import React, { forwardRef } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import "./Top.css";
import CreateButton from "./CreateButton";
import { useNavigate } from "react-router-dom";
import { getToken } from "src/utils/sessionStorage";
import { filterUrl } from "src/utils/halper";
import Filter from "./Filter";

const baseUrl = process.env.REACT_APP_API_URL;

const Page = forwardRef((props, ref) => {
  const {
    children,
    title = "",
    href,
    btnTitle,
    downloadUrl,
    csvFilters,
    filterData,
  } = props;
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate(href, { replace: true });
  };

  const handleCSVDownload = () => {
    return;
    let url = "";
    if (csvFilters && Object.keys(csvFilters).length > 0) {
      url = `${baseUrl}${downloadUrl}${filterUrl(
        csvFilters
      )}&token=${getToken()}`;
    } else {
      url = `${baseUrl}${downloadUrl}?token=${getToken()}`;
    }
    window.location.href = url;
  };

  const handleBulkUpload = () => {
    navigate("/app/bulk_upload", {
      state: { title },
    });
  };

  return (
    <div className="layoutPage" ref={ref}>
      <Helmet>
        <title>{title}</title>
      </Helmet>


      <div className={(btnTitle || downloadUrl) ? "topBarWrapper" : ""}>
        {(<h2 className="topBarWrapper">{title}</h2>)}
        <div className="topBarRightBtnsWrapper">
          {
            downloadUrl &&
            (<button className="csvBtn" onClick={handleCSVDownload}>
              Download PDF
            </button>)
          }
          {(title === "Volunteer" || title === "NGO") && (
            <button className="csvBtn" onClick={handleBulkUpload}>
              Bulk Upload
            </button>
          )}
          {btnTitle && (<CreateButton title={btnTitle} href={href} />)}
        </div>
      </div>


      {/* {(!btnTitle && !downloadUrl) && (
        <div className="topBarWrapper">
          <div className="topBarInner">
            <div className="tobBarBackBtn" onClick={handleBackBtn}>
              <KeyboardBackspaceIcon />
            </div>
            <h2>{title}</h2>
          </div>
        </div>
      )} */}
      {filterData && <div className="filter">
        <Filter filterData={filterData} />
      </div>}
      <div>{children}</div>
    </div>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};
export default Page;
