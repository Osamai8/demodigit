import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Page from "src/components/Page";
import { DistrictListAction } from "src/Redux/District/action";

const DistrictView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(DistrictListAction({ id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = useSelector((state) => {
    return state.District.data.data;
  });

  console.log(data);
  let singleData = data?.length ? data[0] : {};

  return (
    <Page href="/app/district/list" title="District view">
      <div className="viewWrapper">
        <ul>
          <li>
            <h4 className="left">ID</h4>
            <p className="right">{singleData.id}</p>
          </li>
          <li>
            <h4 className="left">Name</h4>
            <p className="right">{singleData.name}</p>
          </li>
          <li>
            <h4 className="left">Code</h4>
            <p className="right">{singleData.code}</p>
          </li>
          <li>
            <h4 className="left">State Name</h4>
            <p className="right">{singleData.state_name}</p>
          </li>
        </ul>
      </div>
    </Page>
  );
};

export default DistrictView;
