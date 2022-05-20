import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../pages/_app";
import style from "../styles/auth.module.scss";
import BackButton from "./BackButton";
import TermsOfUseModal from "./TermsOfUseModal";
import AlertComp from "./AlertComp";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(255,255,255)",
    },
    secondary: {
      main: "rgb(0,0,0)",
    },
  },
});

const Auth = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { userStore } = useContext(Context);

  const [termsOfUseOpen, setTermsOfUseOpen] = useState(false);
  const handleOpenTermsOfUse = () => {
    setTermsOfUseOpen((prevState) => !prevState);
  };

  const [check, setCheck] = useState(false);
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [checkFName, setCheckFName] = useState<boolean>(false);
  const [checkLName, setCheckLName] = useState<boolean>(false);

  const validateEmail = (mail: string) => {
    if (mail === "") setCheckEmail(true);
    else setCheckEmail(false);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      setCheckEmail(false);
    else setCheckEmail(true);
  };

  const validateFName = (firstName: string) => {
    if (firstName === "") setCheckFName(true);
    else setCheckFName(false);
    if (/^[ěščřžýáíéóúůďťňĎŇŤŠČŘŽÝÁÍÉÚŮĚÓa-zA-Z\-\’]+$/.test(firstName)) setCheckFName(false);
    else setCheckFName(true);
  };

  const validateLName = (lastName: string) => {
    if (lastName === "") setCheckLName(true);
    else setCheckLName(false);
    if (/^[ěščřžýáíéóúůďťňĎŇŤŠČŘŽÝÁÍÉÚŮĚÓa-zA-Z\-\’]+$/.test(lastName)) setCheckLName(false);
    else setCheckLName(true);
  };

  return (
    <>
      <TermsOfUseModal
        open={termsOfUseOpen}
        setOpen={setTermsOfUseOpen}
        setCheck={setCheck}
      />
      {userStore.alertBox.show && (
          <AlertComp
              type={userStore.alertBox.type}
              message={userStore.alertBox.message}
          />
      )}
      <ThemeProvider theme={theme}>
        <BackButton pageName={"main"} href={"/"} />
        <Container component="main" sx={{ width: "50%" }}>
          <Box className={style.box}>
            <Avatar sx={{ mt: "1rem", bgcolor: "lightgray" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              fontWeight="500"
              mt="0.5rem"
              color="rgb(255,255,255)"
              variant="h5"
            >
              Sign in
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size={"small"}
                    color="secondary"
                    className={style.textField}
                    sx={{
                      backgroundColor: "rgb(255,255,255)",
                      borderRadius: "5px",
                    }}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    type="text"
                    error={checkFName}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    variant="filled"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      validateFName(e.target.value);
                    }}
                    value={firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size={"small"}
                    type="text"
                    color="secondary"
                    sx={{
                      backgroundColor: "rgb(255,255,255)",
                      borderRadius: "5px",
                    }}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    error={checkLName}
                    name="lastName"
                    autoComplete="family-name"
                    variant="filled"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      validateLName(e.target.value);
                    }}
                    value={lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size={"small"}
                    type="email"
                    color="secondary"
                    sx={{
                      backgroundColor: "rgb(255,255,255)",
                      borderRadius: "5px",
                    }}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    variant="filled"
                    error={checkEmail}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value);
                    }}
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    size={"small"}
                    color="secondary"
                    sx={{
                      backgroundColor: "rgb(255,255,255)",
                      borderRadius: "5px",
                    }}
                    required
                    fullWidth
                    variant="filled"
                  >
                    <InputLabel htmlFor="filled-adornment-password">
                      Password
                    </InputLabel>
                    <FilledInput
                      id="filled-adornment-password"
                      autoComplete="new-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    />
                  </FormControl>
                  <Typography
                    sx={{ fontSize: "10px", ml: 1, color: "rgb(255,255,255)" }}
                  >
                    min 8 characters
                  </Typography>
                </Grid>
                <Grid ml={"15px"} item xs={12}>
                  <FormControlLabel
                    sx={{ mr: "4px" }}
                    control={
                      <Checkbox
                        sx={{
                          color: "rgb(255,255,255) !important",
                        }}
                        checked={check}
                        onClick={() => setCheck((prevState) => !prevState)}
                        size="small"
                      />
                    }
                    label={
                      <Typography
                        sx={{ fontSize: "14px", color: "rgb(255,255,255)" }}
                      >
                        I have read the
                      </Typography>
                    }
                  />
                  <Link
                    sx={{
                      fontSize: "14px",
                      cursor: "pointer",
                      color: "rgb(255,255,255)",
                    }}
                    onClick={handleOpenTermsOfUse}
                  >
                    Terms of Use
                  </Link>
                </Grid>
              </Grid>
              <Button
                className="lightButton"
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 2, mb: 2 }}
                onClick={() =>
                  userStore.registration(email, password, firstName, lastName)
                }
                // value={password}
                disabled={!check}
              >
                Sign Up
              </Button>
              <Grid container mb="1rem" justifyContent="flex-end">
                <Grid item>
                  <Link
                    href={"/login"}
                    variant="body2"
                    sx={{ color: "rgb(255,255,255)" }}
                  >
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default observer(Auth);
