import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';

import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import { create } from 'src/Redux/CreateUser/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

toast.configure();

const MasterCreate = () => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const success = useSelector(state => state.user.success);

  const createUser = e => {
    dispatch(create({ name, userName, email, password, mobile, token }));
    if (success === true) {
      toast.success('User Created Successfull', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userName, setUsername] = React.useState('');
  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');

  return (
    <>
      <Container maxWidth="sm">
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="User Name"
          margin="normal"
          value={userName}
          onChange={e => setUsername(e.target.value)}
          type="text"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Email Address"
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Mobile"
          margin="normal"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          type="text"
          variant="outlined"
        />
        <Box my={2}>
          <Button
            style={{ background: '#3396d3' }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={createUser}
          >
            Create User
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default MasterCreate;
