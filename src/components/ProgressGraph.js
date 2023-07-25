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
  CardContent
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
  }
}));

export default function ProgressGraph({
    total,
    progress,
    initial,
  }) {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const intialPercentage = total !== 0  ? (( initial / total ) * 100 ).toFixed( 2 )  : 0;
  const progressPercentage = total !== 0  ? (( progress / total ) * 100 ).toFixed( 2 )  : 0;

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
        <Container>
          <Card style={{ marginBottom: theme.spacing(2)}}>
            <CardContent>
              <Typography variant="h5" color="primary">
                Status of Tap Water Supply in Rural Homes
              </Typography>

              <div className={ classes.progressContent } style={{ marginLeft: progressPercentage+'%' }}>
                <Typography variant="h6" color="primary">
                  { progressPercentage }%
                </Typography>
                <Typography variant="caption">
                  { dollarIndianLocale.format( progress ) } HH
                </Typography> <br />
                <Typography variant="caption">
                  {new Date().toLocaleString("en-US", {  year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
              </div>

              <div className={ classes.progressBar }>
                  <div style={{ 
                    width: intialPercentage + '%  ', 
                    float: 'left', 
                    borderTopLeftRadius:5, 
                    borderBottomLeftRadius: 5, 
                    background: "repeating-linear-gradient( -45deg, #0856FF,  #0856FF 4px,  #1e4db3 4px, #1e4db3 8px)" , 
                    marginRight: theme.spacing(1),
                    borderRight: "1px dashed #fff",
                    }}
                  ></div>
                  <div style={{ 
                    width: progressPercentage + '%', 
                    background: "#0856FF", 
                    borderRadius: 5 
                    }}
                  ><div>
                      <Typography variant="h6" style={{ color: "#fff" }}>{ (progressPercentage - intialPercentage).toFixed( 2 ) }%</Typography>
                    </div>
                  </div>
              </div>

              <div className={ classes.initialContent } style={{ marginLeft: intialPercentage+'%', width: 50 - intialPercentage + '%  ' }}>
                <Typography variant="h6" color="primary">
                  { intialPercentage }%
                </Typography>
                <Typography variant="caption">{ dollarIndianLocale.format( initial ) } HH</Typography> <br />
                <Typography variant="caption">15 Aug 2019</Typography>
              </div>

              <div className={ classes.totalContent }>
                <Typography variant="h6" color="primary">{ dollarIndianLocale.format( total ) }</Typography>
                <Typography variant="caption">Total HH</Typography>
              </div>

            </CardContent>
          </Card>
        </Container>
      )}
    </>
  );
}
