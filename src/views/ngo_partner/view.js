import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Page from "src/components/Page";
import { ngoPartnerList } from "src/Redux/NgoPartner/action";
import { calculateDomain, calculateNGOType } from "src/utils/halper";

const NGOView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(ngoPartnerList({ id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = useSelector((state) => {
    return state.ngoPartner.data.data;
  });

  let singleData = data?.length ? data[0] : {};

  return (
    <Page href="/app/ngo/list" title="NGO view">
      <div className="viewWrapper">
        {singleData.profile_image_ngo && (
          <img
            src={singleData.profile_image_ngo}
            alt="profile pic"
            height={80}
          />
        )}
        <ul>
          <li>
            <h4 className="left">ID</h4>
            <p className="right">{singleData.id}</p>
          </li>
          <li>
            <h4 className="left">NGO Name</h4>
            <p className="right">{singleData.ngo_name}</p>
          </li>
          <li>
            <h4 className="left">NGO Type</h4>
            <p className="right">
              {calculateNGOType(singleData.ngo_type)}
              {singleData.ngo_type?.indexOf("4") > -1 &&
                `, ${singleData.other_ngo_type}`}
            </p>
          </li>
          <li>
            <h4 className="left">Registration Number</h4>
            <p className="right">{singleData.reg_no}</p>
          </li>
          <li>
            <h4 className="left">Email</h4>
            <p className="right">{singleData.email}</p>
          </li>
          <li>
            <h4 className="left">Mobile Number</h4>
            <p className="right">{singleData.contact_no}</p>
          </li>
          <li>
            <h4 className="left">Foundation year</h4>
            <p className="right">{singleData.foundation_year}</p>
          </li>
          <li>
            <h4 className="left">Districts you work with</h4>
            <p className="right">{singleData.aspirational_district_name}</p>
          </li>
          <li>
            <h4 className="left">Website</h4>
            <p className="right">{singleData.website}</p>
          </li>
          <li>
            <h4 className="left">CEO Name</h4>
            <p className="right">{singleData.ceo_name}</p>
          </li>
          <li>
            <h4 className="left">State Name</h4>
            <p className="right">{singleData.state_name}</p>
          </li>
          <li>
            <h4 className="left">District Name</h4>
            <p className="right">{singleData.district_name}</p>
          </li>
          <li>
            <h4 className="left">Block Name</h4>
            <p className="right">{singleData.block_name}</p>
          </li>
          <li>
            <h4 className="left">Domains</h4>
            <p className="right">{calculateDomain(singleData.domain)}</p>
          </li>
          <li>
            <h4 className="left">Created At</h4>
            <p className="right">
              {moment(singleData.created_at).format("DD/MM/YYYY")}
            </p>
          </li>
          <li>
            <h4 className="left">Updated At</h4>
            <p className="right">
              {moment(singleData.updated_at).format("DD/MM/YYYY")}
            </p>
          </li>
        </ul>
      </div>
    </Page>
  );
};

export default NGOView;
