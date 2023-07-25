import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Page from "src/components/Page";
import { subDomainListAction } from "src/Redux/SubDomain/action";

const SubDomainView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(subDomainListAction({ id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = useSelector((state) => {
    return state.SubDomain.data.data;
  });

  let singleData = data?.length ? data[0] : {};

  return (
    <Page href="/app/sub_domain/list" title="Sub Domain view">
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

export default SubDomainView;
