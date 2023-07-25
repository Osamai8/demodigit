import {
    makeStyles,
    Modal
} from "@material-ui/core";
import React from "react";
import TableList from "./Table";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}));
const FormModal = ({ closeModal, modalTableData, isModalVisible }) => {
    const classes = useStyles();
    const handleClose = () => {
        closeModal(false)
    }
    return (
        <Modal
            open={isModalVisible}
            onClose={handleClose}
            aria-labelledby="modal-modal-fields"
            aria-describedby="modal-modal-language-fields"
            className={classes.modal}
        >
            <TableList tableData={modalTableData} />
        </Modal>
    );
};
export default FormModal;
