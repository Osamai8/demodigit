import React, { useEffect, useState } from "react";
import { Language, Close } from "@material-ui/icons";
import {
  Grid,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FormHelperText,
  Modal,
  Box,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompaingLanuguagesAction,
  createCompainLanuguagesAction,
} from "../../Redux/Languages/action";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalInner: {
    backgroundColor: "#fff",
    maxHeight: "80vh",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    flexDirection: "column",
    margin: "auto",
    overflowY: "auto",
    padding: "1rem",
    borderRadius: "0.4rem",
  },
  inputsWrapper: {
    marginTop: "1rem",
    width: "60vw",
  },
}));

const CustomInput = (props) => {
  const classes = useStyles();
  const {
    touched,
    errorText,
    label,
    name,
    onChange,
    onBlur,
    required,
    value,
    compaignID,
  } = props;

  const dispatch = useDispatch();
  const languages = useSelector((state) => state.languages.translations);
  const redirectToNewPage = useSelector(
    (state) => state.languages.redirectToNewPage
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState([]);

  const showModal = () => {
    dispatch(
      getCompaingLanuguagesAction({
        row_id: compaignID,
        short_key: name,
      })
    );
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e, langId) => {
    if (languages?.length > 0) {
      const newLanguages = languages.map((obj) => {
        if (obj.language_id === langId) {
          obj["translations"] = e.target.value;
          return obj;
        } else {
          return obj;
        }
      });

      setFormData(newLanguages);
    }
  };

  const handleLanguageSubmit = () => {
    if (formData?.length > 0) {
      const requstPayload = [];
      formData.forEach((obj) => {
        requstPayload.push({
          row_id: compaignID,
          short_key: name,
          language_id: obj.language_id,
          translations: obj.translations,
        });
      });
      dispatch(createCompainLanuguagesAction(requstPayload));
    } else {
      toast.warn(
        "No translation is modified! Please modify any translation and try again."
      );
    }
  };

  useEffect(() => {
    if (redirectToNewPage && isModalVisible) {
      setIsModalVisible(false);
      toast.success("Successfully translated!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToNewPage]);

  return (
    <Grid item xs={12} md={6}>
      <FormControl
        variant="outlined"
        fullWidth
        required={required}
        error={Boolean(touched && errorText)}
      >
        <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
        <OutlinedInput
          label={label}
          name={name}
          type="text"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          endAdornment={
            compaignID && (
              <InputAdornment position="end">
                <IconButton onClick={showModal}>
                  <Language />
                </IconButton>
              </InputAdornment>
            )
          }
        />
        <FormHelperText>{touched && errorText}</FormHelperText>
      </FormControl>
      <Modal
        open={isModalVisible}
        onClose={closeModal}
        aria-labelledby="modal-modal-fields"
        aria-describedby="modal-modal-language-fields"
        className={classes.modal}
      >
        <Box className={classes.modalInner}>
          <Grid container>
            <Grid item xs={11} md={11}>
              <h3>Languages</h3>
            </Grid>
            <Grid item xs={1} md={1}>
              <IconButton onClick={() => setIsModalVisible(false)}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.inputsWrapper}>
            {languages?.length > 0 &&
              languages.map((lang) => (
                <>
                  <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor={`outlined-adornment-language`}>
                        Language
                      </InputLabel>
                      <OutlinedInput
                        label="Language"
                        name="language_id"
                        type="text"
                        value={lang.language}
                        readOnly
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor={`outlined-adornment-translate`}>
                        Translate
                      </InputLabel>
                      <OutlinedInput
                        label="Translate"
                        name="translations"
                        type="text"
                        onChange={(e) => handleInputChange(e, lang.language_id)}
                        value={lang.translations ? lang.translations : ""}
                      />
                    </FormControl>
                  </Grid>
                </>
              ))}
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLanguageSubmit}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
};

export default CustomInput;
