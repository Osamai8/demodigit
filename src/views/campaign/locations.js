import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Page from "src/components/Page";
import { getCampaignLocationAction } from "src/Redux/Campaign/action";
import "./index.css";

const CampaignLocations = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const data = useSelector((state) => {
    return state.campaign.data.data;
  });
  let singleData = data?.length ? data : [];

  useEffect(() => {
    if (id) {
      dispatch(getCampaignLocationAction(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page href={`/app/campaign/view/${id}`} title="Campaign Locations">
      <div className="locationsWrapper">
        <table className="locationsTable">
          <thead>
            <tr>
              <th>State Name</th>
              <th>District Name</th>
              <th>Block Name</th>
            </tr>
          </thead>
          <tbody>
            {singleData.map((loc, i) => (
              <tr key={i}>
                <td>{loc.state_name}</td>
                <td>{loc.district_name}</td>
                <td>{loc.block_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
};

export default CampaignLocations;
