import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { getToken } from 'src/utils/sessionStorage';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';

import axios from 'axios';
import UserLocation from './UserLocation';
import { Translate } from '@material-ui/icons';
const baseUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'fixed',
    left: '50%',
    transform: `translate(-50%, 50%)`,
    minWidth: '1000px',
    minHeight: 220,

    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    textAlign: 'center',
  },
}));

function PopUp({ id, role_id }) {
  const [open, setOpen] = useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const handlePopUp = () => {
    setOpen(prev => !prev);
  };
  const CustomModal = () => {
    return open ? (
      <Modal
        className="modal"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <CancelIcon
            onClick={() => setOpen(prev => !prev)}
            style={{
              color: 'black',
              position: 'absolute',
              right: 10,
              top: 5,
              cursor: 'pointer',
            }}
          />
          <UserLocation id={id} role_id={role_id} />
        </div>
      </Modal>
    ) : null;
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      <div>
        <Button color="primary" onClick={handlePopUp}>
          <VisibilityIcon style={{ "color": "#ff9800" }} />
        </Button>
      </div>
      <CustomModal />
    </div>
  );
}

export default PopUp;
