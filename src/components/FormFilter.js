import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BlockList } from 'src/Redux/Block/action';
import { DistrictList } from 'src/Redux/District/action';
import { GrampanchayatList } from 'src/Redux/Grampanchayat/action';
import { StateList } from 'src/Redux/State12/action';
import { VillageList } from 'src/Redux/Village/action';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: 317,
    height: 42,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    backgroundColor: 'white',
  },
  button: {
    marginTop: '3px',
    marginLeft: '5px',
  },
}));

export const FormFilter = ({ searchData, level = '', form = '' }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [StateId, setStateId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [BlockId, setBlockId] = useState('');
  const [PanchayatId, setPanchayatId] = useState('');
  const [VillageId, setVillageId] = useState('');
  const [approveStatus, setApproveStatus] = useState('')

  useEffect(() => {
    dispatch(StateList({ fetched: 'All' }));
  }, []);
  const statesList = useSelector(state => {
    return state.State.list_data;
  });
  const districtsList = useSelector(state => {
    return state.District.list_data;
  });
  const blocksList = useSelector(state => {
    return state.Block.list_data;
  });
  const GrampanchayatsList = useSelector(state => {
    return state.Grampanchayat.list_data;
  });
  const VillagesList = useSelector(state => {
    return state.Village.list_data;
  });
  const handleChangeState = event => {
    setStateId(event.target.value);
    if (level !== 'state') {
      dispatch(DistrictList({ StateId: event.target.value, fetched: 'All' }));
    }
  };
  const handleChangeDistrict = event => {
    setDistrictId(event.target.value);
    if (level !== 'district') {
      dispatch(BlockList({ DistrictId: event.target.value, fetched: 'All' }));
    }
  };
  const handleChangeBlock = event => {
    setBlockId(event.target.value);
    if (level !== 'block') {
      dispatch(
        GrampanchayatList({ BlockId: event.target.value, fetched: 'All' }),
      );
      dispatch(VillageList({ BlockId: event.target.value, fetched: 'All' }));
    }
  };
  const handleChangeGp = event => {
    setPanchayatId(event.target.value);
    if (level !== 'grampanchayat') {
      dispatch(
        VillageList({ PanchayatId: event.target.value, fetched: 'All' }),
      );
    }
  };
  const handleChangeVillage = event => {
    setVillageId(event.target.value);
  };
  let filterObj = {
    StateId
  }
  if (level == 'district' || level == 'block' || level == 'grampanchayat' || level == 'village') {
    filterObj['DistrictId'] = districtId;
  }
  if (level == 'block' || level == 'grampanchayat' || level == 'village') {
    filterObj['BlockId'] = BlockId;
  }
  if (level == 'grampanchayat' || level == 'village') {
    filterObj['PanchayatId'] = PanchayatId;
  }
  if (level == 'village') {
    filterObj['VillageId'] = approveStatus;
  }
  if (form) {
    filterObj['approveStatus'] = approveStatus;
  }
  return (
    <Box
      className="flexContainer"
      display="flex"
      alignItems="center"
      flexWrap="wrap"
    >
      <TextField
        value={StateId}
        name="StateId"
        required
        size="small"
        select
        SelectProps={{ native: true }}
        variant="outlined"
        style={{ width: '317px' }}
        className='fullWidth'

        onChange={e => handleChangeState(e)}
      >
        <option value="">
          All States
        </option>

        {statesList !== undefined && statesList.length
          ? statesList.map((el, i) => (
            <option key={i} value={el.StateId}>
              {el.StateName}
            </option>
          ))
          : ''}
      </TextField>

      <TextField
        value={districtId}
        name="districtId"
        onChange={e => handleChangeDistrict(e)}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        style={{
          display: level == 'state' ? 'none' : '',
          width: '317px',
        }}
        className='fullWidth'

        size="small"
        select
        SelectProps={{ native: true }}
        variant="outlined"
      >
        <option value="">
          All Districts
        </option>

        {districtsList !== undefined && districtsList.length
          ? districtsList.map((el, i) => (
            <option key={i} value={el.districtId}>
              {el.districtname}
            </option>
          ))
          : ''}
      </TextField>

      <TextField
        value={BlockId}
        name="BlockId"
        onChange={e => handleChangeBlock(e)}
        style={{
          display: level == 'state' || level == 'district' ? 'none' : '',
          width: '317px',

          marginBottom: '10px',
        }}
        className='fullWidth'

        size="small"
        select
        SelectProps={{ native: true }}
        variant="outlined"
      >
        <option value="">
          All Blocks
        </option>
        {blocksList !== undefined && blocksList.length
          ? blocksList.map((el, index) => (
            <option key={index} value={el.BlockId}>
              {el.BlockName}
            </option>
          ))
          : ''}
      </TextField>

      <TextField
        value={PanchayatId}
        name="PanchayatId"
        onChange={e => handleChangeGp(e)}
        style={{
          display:
            level == 'state' || level == 'district' || level == 'block'
              ? 'none'
              : '',
          width: '317px',
        }}
        className='fullWidth'

        size="small"
        select
        SelectProps={{ native: true }}
        variant="outlined"
      >
        <option value="">
          All Grampanchayats
        </option>
        {GrampanchayatsList !== undefined && GrampanchayatsList.length
          ? GrampanchayatsList.map((el, index) => (
            <option key={index} value={el.PanchayatId}>
              {el.PanchayatName}
            </option>
          ))
          : ''}
      </TextField>

      <TextField
        value={VillageId}
        name="VillageId"
        onChange={e => handleChangeVillage(e)}
        style={{
          display:
            level == 'state' ||
              level == 'district' ||
              level == 'block' ||
              level == 'grampanchayat'
              ? 'none'
              : '',
          width: '317px',
        }}
        className='fullWidth'

        size="small"
        select
        SelectProps={{ native: true }}
        variant="outlined"
      >
        <option value="">
          All Villages
        </option>
        {VillagesList !== undefined && VillagesList.length
          ? VillagesList.map((el, index) => (
            <option key={index} value={el.VillageId}>
              {el.VillageName}
            </option>
          ))
          : ''}
      </TextField>

      <TextField
        value={approveStatus}
        name="approveStatus"
        onChange={e => setApproveStatus(e.target.value)}
        style={{
          display:
            form ? ''
              : 'none',
          width: '317px',
        }}
        size="small"
        select
        SelectProps={{ native: true }}
        variant="outlined"
        className='fullWidth'

      >
        <option value="">
          All Status
        </option>
        <option value="1">Pending</option>
        <option value="2">Approved</option>
        <option value="3">Rejected</option>
      </TextField>
      <Button
        className={classes.button + ' user_search_form'}
        // alignSelf="flex-end"
        color="primary"
        style={{
          background: '#3396d3',
          width: '111px',
          height: '32px',
        }}
        size="small"
        type="submit"
        variant="contained"
        onClick={() => {
          searchData(filterObj);
        }}
      >
        Search
      </Button>
    </Box>
  );
};
