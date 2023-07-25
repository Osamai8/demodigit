import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getToken } from "src/utils/sessionStorage";
import {
  DISTRICT_COORDINATOR,
  FIELD_ENGINEER,
  STATE_COORDINATOR,
} from "../utils/constant";
import Spinner from "./Spinner/Spinner";
import "./userLocation.css";
const baseUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    padding: "20px",
  },
  container: {
    maxHeight: 440,
    width: "100%",
  },
});

export default function UserLocation({ id, role_id }) {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      axios({
        method: "get",
        url: `${baseUrl}user/getById/${id}`,
        data: id,
        headers: {
          "x-access-token": getToken(),
        },
      })
        .then((res) => {
          setUser(res.data.data);
          setisLoading(false);
        })
        .catch((err) => {
          setisLoading(true);
          if (err.response.status === 400) {
            toast.error("Error while table entry!");
          } else if (err.response.status === 500) {
            toast.error("Internal Server Error");
          } else {
            toast.error(err.message);
          }
        });
    };
    getData();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isLoading || !user ? (
        <Spinner />
      ) : (
        <Paper className={classes.root}>
          <TableContainer className={classes.container + " table"}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {role_id === STATE_COORDINATOR ||
                  role_id === DISTRICT_COORDINATOR ||
                  role_id === FIELD_ENGINEER ? (
                    <TableCell>State Name</TableCell>
                  ) : (
                    ""
                  )}
                  {role_id === DISTRICT_COORDINATOR ||
                  role_id === FIELD_ENGINEER ? (
                    <TableCell>District Name</TableCell>
                  ) : (
                    ""
                  )}
                  {role_id === FIELD_ENGINEER ? (
                    <TableCell>Block Name</TableCell>
                  ) : (
                    ""
                  )}
                  {role_id === FIELD_ENGINEER ? (
                    <TableCell>Panchayat Name</TableCell>
                  ) : (
                    ""
                  )}
                  {role_id === FIELD_ENGINEER ? (
                    <TableCell>Village Name</TableCell>
                  ) : (
                    ""
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {user.length > 0 ? (
                  user.map((u) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={user.code}
                    >
                      {role_id === STATE_COORDINATOR ||
                      role_id === DISTRICT_COORDINATOR ||
                      role_id === FIELD_ENGINEER ? (
                        <TableCell>{u.StateName}</TableCell>
                      ) : (
                        ""
                      )}
                      {role_id === DISTRICT_COORDINATOR ||
                      role_id === FIELD_ENGINEER ? (
                        <TableCell>{u.districtname}</TableCell>
                      ) : (
                        ""
                      )}
                      {role_id === FIELD_ENGINEER ? (
                        <TableCell>{u.BlockName}</TableCell>
                      ) : (
                        ""
                      )}
                      {role_id === FIELD_ENGINEER ? (
                        <TableCell>{u.PanchayatName}</TableCell>
                      ) : (
                        ""
                      )}
                      {role_id === FIELD_ENGINEER ? (
                        <TableCell>{u.VillageName}</TableCell>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell>No Data Found!</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
}
