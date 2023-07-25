import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Page from "src/components/Page";
import { communityInterventionListAction } from "src/Redux/CommunityIntervention/action";

const CommunityInterventionView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(communityInterventionListAction({ id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useSelector((state) => {
    return state.communityIntervention.data.data;
  });

  let singleData = data?.length ? data[0] : {};
  console.log(singleData);

  return (
    <Page
      href="/app/community_intervention/list"
      title="Community intervention view"
    >
      <div className="viewWrapper">
        <ul>
          <li>
            <h4 className="left">ID</h4>
            <p className="right">{singleData.id}</p>
          </li>
          <li>
            <h4 className="left">Campaign Name</h4>
            <p className="right">{singleData.campaign_name}</p>
          </li>
          <li>
            <h4 className="left">Volunteer Name</h4>
            <p className="right">{singleData.volunteer_name}</p>
          </li>
          <li>
            <h4 className="left">
              How many rallies Organised in your Field Support area in last
              week?
            </h4>
            <p className="right">
              {singleData.rallies_organised_field_support_area}
            </p>
          </li>
          <li>
            <h4 className="left">Number of person participated in Rally</h4>
            <p className="right">
              {singleData.number_of_person_participated_in_rally}
            </p>
          </li>
          <li>
            <h4 className="left">
              How many street play organised in last week?
            </h4>
            <p className="right">{singleData.how_many_street_play_organised}</p>
          </li>
          <li>
            <h4 className="left">
              Number of person participated in street play
            </h4>
            <p className="right">
              {singleData.number_person_participated_street_play}
            </p>
          </li>
          <li>
            <h4 className="left">Created At</h4>
            <p className="right">
              {moment(singleData.created_at).format("DD-MM-YYYY")}
            </p>
          </li>
          <li>
            <h4 className="left">Updated At</h4>
            <p className="right">
              {moment(singleData.updated_at).format("DD-MM-YYYY")}
            </p>
          </li>
        </ul>
      </div>
    </Page>
  );
};

export default CommunityInterventionView;
