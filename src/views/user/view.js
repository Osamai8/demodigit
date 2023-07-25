import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Page from "src/components/Page";
import { userListAction } from "src/Redux/Users/action";

const UserView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(userListAction({ id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = useSelector((state) => {
    return state.user.data.data;
  });

  let singleData = data?.length ? data[0] : {};

  return (
    <Page href="/app/user_management/list" title="User view">
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
            <h4 className="left">Username</h4>
            <p className="right">{singleData.username}</p>
          </li>
          <li>
            <h4 className="left">Email</h4>
            <p className="right">{singleData.email}</p>
          </li>
          <li>
            <h4 className="left">Mobile Number</h4>
            <p className="right">{singleData.mobile}</p>
          </li>
          <li>
            <h4 className="left">Mobile verified</h4>
            <p className="right">{singleData.mobile_verified.toString()}</p>
          </li>
          <li>
            <h4 className="left">Email verified</h4>
            <p className="right">{singleData.email_verified.toString()}</p>
          </li>
          <li>
            <h4 className="left">Role Name</h4>
            <p className="right">{singleData.role_name}</p>
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

export default UserView;
