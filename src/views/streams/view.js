import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Page from "src/components/Page";
import { streamListAction } from "src/Redux/Stream/action";

const StreamView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(streamListAction({ id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = useSelector((state) => {
    return state.Stream.data.data;
  });

  let singleData = data?.length ? data[0] : {};

  return (
    <Page href="/app/stream/list" title="Stream view">
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
            <h4 className="left">Sub Domain Name</h4>
            <p className="right">{singleData.sub_domain_name}</p>
          </li>
          <li>
            <h4 className="left">Domain Name</h4>
            <p className="right">{singleData.domain_name}</p>
          </li>
          <li>
            <h4 className="left">Created At</h4>
            <p className="right">
              {moment(singleData.created_at).format("DD/MM/YYYY")}
            </p>
          </li>
          <li>
            <h4 className="left">َUpdated At</h4>
            <p className="right">
              {moment(singleData.updated_at).format("DD/MM/YYYY")}
            </p>
          </li>
        </ul>
      </div>
    </Page>
  );
};

export default StreamView;
