import {
  NativeSelect,
  Button,
  CircularProgress,
  Typography,
  Modal,
  makeStyles,
  TextField,
  Box
} from '@material-ui/core';
import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
const useStyles = makeStyles(theme => ({
  paper: {
    position: 'fixed',
    left: '50%',
    transform: `translate(-50%, 170%)`,
    width: 400,
    height: 200,

    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    textAlign: 'center',
  },
}));
export const ApprovedStatusModal = ({
  open,
  handleSubmit,
  isModalClose,
  handleClose,
  approveStatus
}) => {
  const classes = useStyles();
  const [rejected_reason, setRejectedReason] = useState('');
  const [rejectedError, setRejectedError] = useState(false);

  const submitForm = e => {
    e.preventDefault();
    let status = "";
    if (approveStatus === "Approve") {
      status = "2";
    } else if (approveStatus == "Edit") {
      status = "4";
    } else {
      status = "3";
    }
    if (rejected_reason=="" && approveStatus == "Reject") {
      setRejectedError(true)
      return false;
    } else {
      handleSubmit({ status, rejected_reason });
      setRejectedError(false)
    }
  };
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
    >
      <div className={classes.paper}>
        {/* <CancelIcon
          onClick={handleClose}
          style={{
            color: 'black',
            position: 'absolute',
            right: 10,
            top: 5,
            cursor: 'pointer',
          }}
        /> */}
        <form>
          <Typography
            style={{ marginTop: 5 }}
            variant="subtitle1"
            id="simple-modal-description"
          >
            {approveStatus !== "Approve" && approveStatus !== "Edit" ? (<TextField
              fullWidth
              label="Reason for Rejection"
              required={approveStatus == "Reject" ? true : false}
              name="rejected_reason"
              onChange={e => setRejectedReason(e.target.value)}
              value={rejected_reason}
            />) : <span>Are you sure you want to {approveStatus === "Approve" ? "approve" : "edit"} ?</span>}
             <div style={{marginRight:"30%"}}>{rejectedError ? (<span style={{"color":"red"}}>Reason for rejection is required</span>) : ""}</div>
            {/* < br /> */}
            <Box display="flex" justifyContent="flex-end" style={{ marginTop: "40px" }}>
              <Button
                className="csvButton"
                size="medium"
                fullWidth
                variant="contained"
                onClick={handleClose}
                style={{ marginRight: '8px' }}
              >
                Cancel
            </Button>
              <Button
                className="csvButton"
                size="medium"
                fullWidth
                type="submit"
                variant="contained"
                onClick={submitForm}
              >
                Ok
            </Button>
            </Box>
          </Typography>
        </form>
      </div>
    </Modal>
  );
};
