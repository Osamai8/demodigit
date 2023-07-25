import React, { useEffect, useState } from 'react';
import Spinner from './Spinner/Spinner';
import
{
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  withStyles,
  NativeSelect,
  Paper,
  Radio,
  Typography,
  Divider,
  Card,
  CardContent
} from '@material-ui/core';
import theme from 'src/theme';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#fff",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);


const useStyles = makeStyles(theme => ( {
  select: {
    border: "1px solid #DAE6FF",
    padding: theme.spacing(.5),
    borderRadius: 5,
    fontSize: 12,

    "&.small": {
      fontSize: 9,
    }
  },
  divider:{
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }

}));

export default function FundExpenditure({

  }) {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    
    const getData = async () => {
      setisLoading(false);
    };
    getData();
    return () => {};
  }, []);
  return (
    <>
      {isLoading || !user ? (
        <Spinner />
      ) : (
        <Container style={{ marginTop: theme.spacing(2) }}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs>
                <Typography variant="h5" color="primary">Progress</Typography>
              </Grid>
              <Grid item xs="auto">
                <FormControl variant="filled" className={classes.formControl}>
                  <select className={ classes.select }>
                    <option selected>
                      2021-2022
                    </option>
                  </select>
                </FormControl>
              </Grid>
            </Grid>
            <Divider className={ classes.divider } />
            <Grid container>
              <Grid item xs>
                <Typography variant="h3" color="">48%</Typography>
              </Grid>
              <Grid item xs="auto">
                <FormControl variant="filled" className={classes.formControl}>
                  <select className={ classes.select + " small" }> 
                    <option selected>
                      Center Fund
                    </option>
                  </select>
                </FormControl>
              </Grid>
            </Grid>
            <Typography variant="body">Funds utilized in Orrissa</Typography> <br />
            <Typography variant="caption">Funding pattern - 50:50 (Center and State) </Typography>
          </CardContent>
          <CardContent>
            <Grid container alignItems="center" style={{ marginBottom: theme.spacing(1) }}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Funds assured</Typography>
              </Grid>
              <Grid item xs={4}>
                <BorderLinearProgress variant="determinate" value={52} color={ theme.palette.success.main } />
              </Grid>
              <Grid item xs={4}>
                <Box variant="subtitle2" align="right" color={ theme.palette.success.main }>52 cr</Box>
                
              </Grid>
            </Grid>
            <Grid container alignItems="center" style={{ marginBottom: theme.spacing(1) }}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Funds drawn</Typography>
              </Grid>
              <Grid item xs={4}>
                <BorderLinearProgress variant="determinate" value={35} color={ theme.palette.success.main } />
              </Grid>
              <Grid item xs={4}>
                <Box variant="subtitle2" align="right" color={ theme.palette.error.main }>35 cr</Box>
                
              </Grid>
            </Grid>
            <Grid container alignItems="center" style={{ marginBottom: theme.spacing(1) }}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Utilized (Expenditure)</Typography>
              </Grid>
              <Grid item xs={4}>
                <BorderLinearProgress variant="determinate" value={25} color="primary" />
              </Grid>
              <Grid item xs={4}>
                <Box variant="subtitle2" align="right" color={ theme.palette.primary.main }>25 cr</Box>
                
              </Grid>
            </Grid>
          </CardContent>
        </Card>        
      </Container>
      )}
    </>
  );
}
