import { Button, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Page from "src/components/Page";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CsvDownloader from "react-csv-downloader";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { csvColsGenerator } from "../../utils/constant";
import { ngoBulkUploadAction } from "src/Redux/NgoPartner/action";
import { volunteerBulkUploadAction } from "src/Redux/Volunteer/action";
import "./index.css";

const BulkUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;
  const dispatch = useDispatch();
  const [files, setFiles] = useState(null);
  const ngos = useSelector((state) => state.ngoPartner);
  const volunteers = useSelector((state) => state.volunteer);

  const csvs = csvColsGenerator(title);

  const handleChange = (e) => {
    setFiles(e.target.files[0]);
  };

  useEffect(() => {
    if (volunteers.redirectToNewPage) {
      navigate("/app/volunteer/list", { replace: true });
    }
    if (ngos.redirectToNewPage) {
      navigate("/app/ngo/list", { replace: true });
    }
  }, [ngos.redirectToNewPage, volunteers.redirectToNewPage, navigate]);

  const handleUpload = () => {
    if (files !== null) {
      const formData = new FormData();
      formData.append("file", files);

      if (title === "NGO") {
        dispatch(ngoBulkUploadAction(formData));
      } else if (title === "Volunteer") {
        dispatch(volunteerBulkUploadAction(formData));
      } else {
        alert("Invalid");
      }
    } else {
      alert("Please select a file");
    }
  };

  return (
    <Page title={`${title} Bulk Upload`} href="/app/beneficiary/list">
      <div className="bulkUploadContainer">
        <div className="downloadCSV">
          <h4>Download a sample CSV file by clicking bellow icon</h4>

          <CsvDownloader
            filename={title === "NGO" ? "ngo_sample" : "volunteer_sample"}
            extension=".csv"
            columns={csvs.cols}
            datas={csvs.data}
          >
            <button>
              <CloudDownloadIcon />
            </button>
          </CsvDownloader>
        </div>
        <div className="bulkUploadWrapper">
          <div className="downloadCSV">
            <h4>Upload your CSV file by clicking bellow icon</h4>

            <button>
              <input
                type="file"
                className="uploadInput"
                onChange={handleChange}
              />
              <CloudUploadIcon />
            </button>
          </div>
          {files !== null && (
            <div className="dropZondBtnWrapper">
              <p>{files.name}</p>
              <Button color="primary" onClick={handleUpload}>
                {ngos.isLoading || volunteers.isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default BulkUpload;
