import { PhotoCamera, Visibility, VisibilityOff } from "@material-ui/icons";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CircularProgress,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../pages/_app";
import AlertComp from "./AlertComp";
import ConfirmModal from "./ConfirmModal";

const AccountBasicInfo = () => {
  const { userStore } = useContext(Context);
  let user = userStore.getUser();
  // let avatarka: string = userStore.getAvatar().img;

  if (userStore.isLoading) {
    return (
      <Stack alignItems="center" mt="50vh">
        {" "}
        <CircularProgress />{" "}
      </Stack>
    );
  }

  const [avatar, setAvatar] = useState<string>("");
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [checkFirstName, setCheckFirstName] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [checkLastName, setCheckLastName] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(user.email);
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [openDeleteConfirm, setDeleteConfirmOpen] = useState<boolean>(false);
  const [openChangeConfirm, setChangeConfirmOpen] = useState<boolean>(false);
  const [file, setFile] = useState<Blob>();

  const [preview, setPreview] = useState<string>();

  const getAvatar = async () => {
    const avatarPhoto = await userStore.getUserAvatar();
    if (avatarPhoto) setAvatar(avatarPhoto);
  };

  useEffect(() => {
    getAvatar();
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handlePhoto = async () => {
    if (file !== undefined) {
      let data = new FormData();
      data.append("file", file);
      await userStore.uploadAvatar(data);
      setFile(undefined);
    }
  };

  const handleChange = async () => {
    if (
      checkEmail === false &&
      checkFirstName === false &&
      checkLastName === false &&
      checkPassword === false &&
      (email !== user.email ||
        firstName !== user.firstName ||
        lastName !== user.lastName ||
        (password !== "" && newPassword !== ""))
    ) {
      await userStore.changeAccountInfo(
        email,
        password,
        newPassword,
        firstName,
        lastName
      );
      user = userStore.getUser();
    }
  };

  const handleDelete = () => {
    userStore.deleteAccount();
  };

  const validateEmail = (mail: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      setCheckEmail(false);
    else setCheckEmail(true);
  };

  const validatePassword = () => {
    if (
      (newPassword !== "" && password === "") ||
      (newPassword === "" && password !== "")
    )
      setCheckPassword(true);
    else if (newPassword === "" && password === "") setCheckPassword(false);
    else if (newPassword.length < 8 || password.length < 8) {
      setCheckPassword(true);
    } else if (
      password !== "" &&
      newPassword !== "" &&
      password === newPassword
    ) {
      setCheckPassword(true);
      userStore.setAlertBox(
        true,
        "warning",
        "New password cannot be the same as your current password."
      );
    } else setCheckPassword(false);
  };

  const validateName = (name: string, type: string) => {
    switch (type) {
      case "fn":
        /^[a-zA-Z]+$/.test(name)
          ? setCheckFirstName(false)
          : setCheckFirstName(true);
        break;
      case "ln":
        /^[a-zA-Z]+$/.test(name)
          ? setCheckLastName(false)
          : setCheckLastName(true);
        break;
    }
  };

  useEffect(() => {
    validatePassword();
  }, [password, newPassword]);

  return (
    <>
      {userStore.alertBox.show && (
        <AlertComp
          type={userStore.alertBox.type}
          message={userStore.alertBox.message}
        />
      )}
      <ConfirmModal
        title={"Delete account"}
        text={
          "Do you really want to delete your account? This is permanent and irreversible."
        }
        open={openDeleteConfirm}
        setOpen={setDeleteConfirmOpen}
        onConfirm={() => handleDelete()}
      />
      <ConfirmModal
        title={"Change account"}
        text={
          "Do you really want to change your account information? This is permanent and irreversible."
        }
        open={openChangeConfirm}
        setOpen={setChangeConfirmOpen}
        onConfirm={() => handleChange()}
      />
      <Box className="mainSection">
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: "40%", mt: 2 }}>
            <Typography textAlign="center" mb={6} variant="h6">
              Basic information
            </Typography>
            <Box
              sx={{
                width: "85%",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <TextField
                variant="outlined"
                error={email === "" || checkEmail}
                fullWidth
                sx={{ mb: "1rem" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                value={email}
                id="email"
                label="Email"
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    error={
                      firstName === "" ||
                      firstName?.length < 2 ||
                      checkFirstName
                    }
                    sx={{ mb: "1rem" }}
                    variant="outlined"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      validateName(e.target.value, "fn");
                    }}
                    id="firstname"
                    value={firstName}
                    label="First name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    sx={{ mb: "1rem" }}
                    error={
                      lastName === "" || lastName?.length < 2 || checkLastName
                    }
                    variant="outlined"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      validateName(e.target.value, "ln");
                    }}
                    value={lastName}
                    id="lastname"
                    label="Last name"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" sx={{ mb: "1rem" }}>
                    <InputLabel>Current password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      error={checkPassword}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword();
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Current password"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ mb: "1rem" }} variant="outlined">
                    <InputLabel>New password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      error={checkPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        validatePassword();
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowNewPassword((prevState) => !prevState)
                            }
                            edge="end"
                          >
                            {showNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="New password"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                className="darkButton"
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 2, mb: 2 }}
                onClick={() => setChangeConfirmOpen(true)}
              >
                Change
              </Button>
            </Box>
          </Box>

          <Divider orientation="vertical" />

          <Box sx={{ flex: "60%", mt: 2 }}>
            <Typography variant="h6" mb={2} textAlign="center">
              Profile photo
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: "25%" }}>
                <Box
                  sx={{
                    width: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    display: "grid",
                    gridTemplateRows: "repeat(3)",
                  }}
                >
                  <Typography textAlign="center">Current photo</Typography>
                  {avatar ? (
                    <img
                      height="300px"
                      width="auto"
                      style={{
                        maxWidth: "500px",
                        borderRadius: "10px",
                        boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
                      }}
                      src={`/uploads/${avatar}`}
                      alt={"uploaded image"}
                    />
                  ) : (
                    <Typography mt={2} variant="body2" textAlign="center">
                      Profile photo has not been uploaded yet
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box sx={{ flex: "35%" }}>
                <Box
                  sx={{
                    width: "90%",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    display: "grid",
                    gridTemplateRows: "repeat(3)",
                  }}
                >
                  {/*<form onSubmit={handlePhoto} encType='multipart/form-data'>*/}
                  <label
                    htmlFor="file"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                      fontFamily: "Roboto, Helvetica, Arial,sans-serif",
                    }}
                  >
                    <input
                      style={{ display: "none" }}
                      accept=".png, .jpg, .jpeg"
                      type="file"
                      id="file"
                      name="file"
                      onChange={(e) => setFile(e.target.files![0])}
                    />
                    {/*</form>*/}
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                    Upload new avatar photo
                  </label>
                  {file && (
                    <Box>
                      <IconButton
                        sx={{ float: "right" }}
                        onClick={() => setFile(undefined)}
                      >
                        <CloseIcon />
                      </IconButton>
                      <img
                        height="300px"
                        width="auto"
                        style={{ maxWidth: "400px", maxHeight: "300px" }}
                        src={preview}
                        alt={"uploaded image"}
                      />
                    </Box>
                  )}
                  <Button
                    sx={{
                      width: "200px",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                    }}
                    className="darkButton"
                    variant="outlined"
                    component="span"
                    onClick={handlePhoto}
                  >
                    Upload
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button
          className="redButton"
          type="submit"
          variant="outlined"
          sx={{
            float: "right",
            color: "white",
          }}
          onClick={() => setDeleteConfirmOpen(true)}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          Delete account
        </Button>
      </Box>
    </>
  );
};

export default observer(AccountBasicInfo);
