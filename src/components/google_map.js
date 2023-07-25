import {
    Button,
    Typography,
    Modal,
    makeStyles,
    Box
} from '@material-ui/core';
import { MyMapComponent } from './map';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { useEffect, useState } from 'react';
import { BermudaTriangle } from './ArcGIS';
import { Map, Scene } from '@esri/react-arcgis';
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
function MapShow({ lat, lng }) {
    const [open, setOpen] = useState(false);
    const handlePopUp = () => {
        setOpen(prev => !prev);
    };
    const GoogleMap = () => {
        const classes = useStyles();
        return open ? (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div className={""}>
                    <form>
                        <Typography
                            style={{ marginTop: 20 }}
                            variant="subtitle1"
                            id="simple-modal-description"
                        >
                            {/* <BermudaTriangle />    */}

                            <div style={{ "height": "800px"}}>
                                <Map class="full-screen-map">
                                    <BermudaTriangle  lat={lat} lng={lng}/>
                                </Map>
                            </div>
                            {/* <MyMapComponent lat={lat} lng={lng} /> */}
                            <Box display="flex" justifyContent="flex-end" style={{ marginTop: "40px" }}>
                                <Button
                                    className="csvButton"
                                    size="medium"
                                    // fullWidth
                                    variant="contained"
                                    style={{ marginRight: '8px' }}
                                >
                                    Close
                             </Button>
                            </Box>
                        </Typography>
                    </form>
                </div>
            </Modal>
        ) : null;
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <div>
                <Button color="primary" onClick={handlePopUp}>
                    <LocationOnIcon />
                </Button>
            </div>
            <GoogleMap />
        </div>
    )
}
export default MapShow;