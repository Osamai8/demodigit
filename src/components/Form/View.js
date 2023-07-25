import { Card, CardContent, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";

const ViewData = ({ objView: data }) => {
  const [rowCells, setRowCells] = useState([]);

  useEffect(() => {
    if (data) {
      const mainArr = data?.map((elem, index) => <div className="form-parent" key={index}>
        <div className="form-p">
          <span className="form-p-title">{elem?.title}</span>
          <span className="form-p-span">
            :{" "}
            {elem?.value}
          </span>
        </div>
        <br />
      </div>);
      setRowCells(mainArr);
    }
  }, [data]);

  return (
    // <div className="viewWrapper">
    <div className="" style={{ marginLeft: "12px" }}>
      <Card>
        <CardContent>
          <Grid container>{rowCells}</Grid>
        </CardContent>
      </Card>
    </div>
  );
};
export default ViewData;
