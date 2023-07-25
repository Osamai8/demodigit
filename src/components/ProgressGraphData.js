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
  NativeSelect,
  Paper,
  Radio,
  Typography,
  Card,
  CardContent,
} from '@material-ui/core';
import theme from 'src/theme';

const dollarIndianLocale = Intl.NumberFormat( 'en-IN' );


const useStyles = makeStyles(theme => ( {
  root: {
    width: '100%',
    height: '100%',
    padding: '20px',
  },
  progressContent:{
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.primary.main  ,
    paddingLeft: theme.spacing( 1 ),
    paddingBottom: theme.spacing( 1 ),
    position: "relative",
    marginTop: theme.spacing(2),
    
    "&::after": {
      content: '""',
      position: "absolute",
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.primary.main  ,
      borderRadius: "50%",
      top: 0,
      left: -4,
      width: 6,
      height: 6,
      background: "#fff",
    }
  },
  totalContent:{
    float: "right",
    textAlign: 'right',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.primary.main  ,
    paddingRight: theme.spacing( 1 ),
    paddingBottom: theme.spacing( 1 ),
    paddingTop: theme.spacing(1),
    position: "relative",
    display: "inline-block",
    width: "49%",
    verticalAlign: "top",
    
    "&::after": {
      content: '""',
      position: "absolute",
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.primary.main  ,
      borderRadius: "50%",
      bottom: 0,
      right: -4,
      width: 6,
      height: 6,
      background: "#fff",
    }
  },
  
  initialContent:{
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.primary.main  ,
    paddingLeft: theme.spacing( 1 ),
    paddingBottom: theme.spacing( 1 ),
    paddingTop: theme.spacing( 1 ),
    position: "relative",
    display: "inline-block",
    // width: "49%",
    verticalAlign: "top",
    
    "&::after": {
      content: '""',
      position: "absolute",
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.primary.main  ,
      borderRadius: "50%",
      bottom: 0,
      left: -4,
      width: 6,
      height: 6,
      background: "#fff",
    },
  },
  progressBar: {
    background: "#EFF4FF",
    borderRadius: 5,
    height: 26,

    "& div":{
      height: 26,
      // display: "inline-block",
      // verticalAlign: "middle",

      "& h6":{
        paddingTop: 3
      },
    },
  },
  BoxBlueLight: {
    background: '#F5F8FF',
    padding: theme.spacing(1),
  },
  textMuted: {
    color: '#797979',
    fontSize: 12,
  },
}));

export default function ProgressGraphData({
    total,
    progress,
    initial,
  }) {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const intialPercentage = total !== 0  ? (( initial / (initial + progress + total ) ) * 100 ).toFixed( 2 )  : 0;
  const progressPercentage = total !== 0  ? (( progress / (initial + progress + total ) ) * 100 ).toFixed( 2 )  : 0;

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
        <Container >
          <Typography style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(1) }} variant="h5" color="primary">
            Status of Progress in Village
          </Typography>
          <Card style={{ marginBottom: theme.spacing(2)}}>
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h3">{ initial + progress + total }</Typography>
                  <Typography variant="body">Total no. of Villages</Typography>

                </Grid>
                <Grid item xs={6} align="right">
                  <Typography variant="caption">WS : Water Supply </Typography>
                </Grid>
              </Grid>
              <div className={ classes.progressContent } style={{ marginLeft: progressPercentage+'%' }}>
                <Typography variant="h6" color="primary">
                  { progress }
                </Typography>
                <Typography variant="caption">
                  Work In Progress
                </Typography>
              </div>

              <div className={ classes.progressBar }>
                <Typography component="span" variant="h6" color="primary" style={{ float: "right", marginTop: theme.spacing(.4), marginRight: theme.spacing(.5) }}>65%</Typography>
                  <div style={{ 
                    width: intialPercentage + '%  ', 
                    float: 'left', 
                    borderTopLeftRadius:5, 
                    borderBottomLeftRadius: 5, 
                    background: "repeating-linear-gradient( -45deg, #0856FF,  #0856FF 4px,  #1e4db3 4px, #1e4db3 8px)" , 
                    marginRight: theme.spacing(1),
                    borderRight: "1px dashed #fff",
                    color: "#fff",
                    textAlign: "right",
                    lineHeight: "29px",
                    fontWeight: 500,
                    fontSize: 12,
                    paddingRight: theme.spacing(.5)
                    }}
                  >15%</div>
                  <div style={{ 
                    width: progressPercentage + '%', 
                    background: "#0856FF", 
                    borderRadius: 5 
                    }}
                  >
                    <div>
                      <Typography variant="h6" style={{ color: "#fff", paddingRight: theme.spacing(.5) }} align="right">{ (progressPercentage - intialPercentage).toFixed( 0 ) }%</Typography>
                    </div>
                  </div>
              </div>

              <div className={ classes.initialContent } style={{ marginLeft: intialPercentage+'%', width: 50 - intialPercentage + '%  ' }}>
                <Typography variant="h6" color="primary">
                  { initial }
                </Typography>
                <Typography variant="caption">HGJ Villages</Typography>
              </div>

              <div className={ classes.totalContent }>
                <Typography variant="h6" color="primary">{  total  }</Typography>
                <Typography variant="caption">Work Not Started</Typography>
              </div>

            </CardContent>
          </Card>
          <Grid container spacing="2" direction="column">
              <Grid item>
                <Grid container spacing={1} alignItems="stretch" direction="row">
                  <Grid item xs="4">
                    <Box className={classes.BoxBlueLight} borderRadius={4}>
                      <Typography className={classes.textMuted} align="center">
                        VWSC Villages
                      </Typography>
                      <Typography className={classes.numbers} color="primary" align="center">
                        757
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs="4">
                    <Box className={classes.BoxBlueLight} borderRadius={4}>
                      <Typography className={classes.textMuted} align="center">
                        VAP Prepared
                      </Typography>
                      <Typography className={classes.numbers} color="primary" align="center">
                        47,884
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs="4">
                    <Box className={classes.BoxBlueLight} borderRadius={4}>
                      <Typography className={classes.textMuted} align="center">
                        GWMP Villages
                      </Typography>
                      <Typography className={classes.numbers} color="primary" align="center">
                        93,639
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography className={classes.textMuted}>
                  VWSC : Village Water and Sanitation Committee
                </Typography>
                <Typography className={classes.textMuted}>
                  VAP     : Village Action Plan
                </Typography>
                <Typography className={classes.textMuted}>
                  GWMP : Grey Water Management Plan
                </Typography>
              </Grid>
            </Grid>
        </Container>
      )}
    </>
  );
}
