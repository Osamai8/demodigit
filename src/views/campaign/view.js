import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Page from "src/components/Page";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignByIdAction } from "src/Redux/Campaign/action";
import moment from "moment";
import {
  calculateEducation,
  calculateLearningOpp,
  calculateModeOfCamp,
  calculateStakeHolders,
  calculateTypeOfPhone,
  calculateWorkExp,
} from "src/utils/halper";
import { Button } from "@material-ui/core";
import "./index.css";

const CampaignView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLocations = () => {
    navigate(`/app/campaign/locations/${id}`);
  };

  useEffect(() => {
    if (id) {
      dispatch(getCampaignByIdAction(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useSelector((state) => {
    return state.campaign.data.data;
  });

  let singleData = data?.length ? data[0] : {};

  return (
    <Page href="/app/campaign/List" title="Campaign View">
      <dive className="viewWrapper">
        {singleData.logo !== "" && (
          <img src={singleData.logo} alt="Logo" className="logoView" />
        )}
        <ul>
          <li>
            <h4 className="left">ID</h4>
            <p className="right">{singleData.id}</p>
          </li>
          <li>
            <h4 className="left">Transaction ID</h4>
            <p className="right">{singleData.txn_id}</p>
          </li>
          <li>
            <h4 className="left">Name</h4>
            <p className="right">{singleData.name}</p>
          </li>
          <li>
            <h4 className="left">Campaign Type</h4>
            <p className="right">{singleData.campaign_type_name}</p>
          </li>
          <li>
            <h4 className="left">Domain Name</h4>
            <p className="right">{singleData.domain_name}</p>
          </li>
          <li>
            <h4 className="left">Sub Domain Name</h4>
            <p className="right">{singleData.sub_domain_name}</p>
          </li>
          <li>
            <h4 className="left">Stream Name</h4>
            <p className="right">{singleData.stream_name}</p>
          </li>
          <li>
            <h4 className="left">Campaign Benificiary</h4>
            <p className="right">{singleData.campaign_beneficiary}</p>
          </li>
          <li>
            <h4 className="left">Campaign Goal</h4>
            <p className="right">{singleData.campaign_goal}</p>
          </li>
          <li>
            <h4 className="left">Stakeholders Associated</h4>
            <p className="right">
              {calculateStakeHolders(singleData.stakeholders_asscociated)}
            </p>
          </li>
          <li>
            <h4 className="left">Your role in this campaign</h4>
            <p className="right">{singleData.your_role_in_this_campaign}</p>
          </li>
          <li>
            <h4 className="left">Learning Opportunities</h4>
            <p className="right">
              {calculateLearningOpp(singleData.learning_opportunities)}
            </p>
          </li>
          <li>
            <h4 className="left">Start Date</h4>
            <p className="right">
              {moment(singleData.start_date).format("DD/MM/YYYY")}
            </p>
          </li>
          <li>
            <h4 className="left">End Date</h4>
            <p className="right">
              {singleData.end_date
                ? moment(singleData.end_date).format("DD/MM/YYYY")
                : ""}
            </p>
          </li>

          <li>
            <h4 className="left">Mode of Campaign</h4>
            <p className="right">
              {calculateModeOfCamp(singleData.mode_of_campaign)}
            </p>
          </li>
          <li>
            <h4 className="left">Education</h4>
            <p className="right">{calculateEducation(singleData.education)}</p>
          </li>
          <li>
            <h4 className="left">Work Experience</h4>
            <p className="right">
              {calculateWorkExp(singleData.work_experience)}
            </p>
          </li>
          <li>
            <h4 className="left">Type of Phone</h4>
            <p className="right">
              {calculateTypeOfPhone(singleData.type_of_phone)},{" "}
              {singleData.other_type_of_phone}
            </p>
          </li>
          <li>
            <h4 className="left">Number of Hours Committed</h4>
            <p className="right">
              {singleData.no_of_hours_committed} hours/per week
            </p>
          </li>

          <li>
            <h4 className="left">Brief</h4>
            <p className="right">{singleData.brief}</p>
          </li>

          <li>
            <h4 className="left">Learning Module URL</h4>
            <p className="right">
              <a
                href={singleData.learning_module_url}
                target="_blank"
                without
                rel="noreferrer"
              >
                {singleData.learning_module_url}
              </a>
            </p>
          </li>

          <li>
            <h4 className="left">Learning Module Summary</h4>
            <p className="right">
              <div
                dangerouslySetInnerHTML={{
                  __html: singleData?.learning_module_summary,
                }}
              />
            </p>
          </li>
        </ul>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          style={{ margin: "1rem 0" }}
          onClick={handleLocations}
        >
          See locations
        </Button>
      </dive>
    </Page>
  );
};
export default CampaignView;
