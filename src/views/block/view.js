import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Page from "src/components/Page";
import { blockListAction } from "src/Redux/Block/action";

const BlockView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(blockListAction({ id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = useSelector((state) => {
    return state.Block.data.data;
  });

  console.log(data);
  let singleData = data?.length ? data[0] : {};

  return (
    <Page href="/app/block/list" title="Block view">
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
            <h4 className="left">District Name</h4>
            <p className="right">{singleData.district_name}</p>
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

export default BlockView;
