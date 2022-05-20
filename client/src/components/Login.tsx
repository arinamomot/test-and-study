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
import AlertComp from "./AlertComp";
import BackButton from "./BackButton";
import Footer from "./Footer";

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

const Login = () => {
  const { userStore } = useContext(Context);

  const [email, setEmail] = useState<string>("");
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validateEmail = (mail: string) => {
    if (mail === "") setCheckEmail(true);
    else setCheckEmail(false);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      setCheckEmail(false);
    else setCheckEmail(true);
  };

  return (
    <>
      {userStore.alertBox.show && (
        <AlertComp
          type={userStore.alertBox.type}
          message={userStore.alertBox.message}
        />
      )}
      <ThemeProvider theme={theme}>
        <Box className="body" height="100vh">
          <BackButton pageName={"main"} href={"/"} />
          <Container component="main" sx={{ width: "40%" }}>
            <Box className={style.box}>
              <Avatar sx={{ mt: "1rem", mb: "0.5rem", bgcolor: "lightgray" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                fontWeight="500"
                mt="0.5rem"
                mb="1rem"
                color="white"
                variant="h5"
              >
                Log in
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      size={"small"}
                      color="secondary"
                      sx={{ backgroundColor: "white", borderRadius: "5px" }}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      variant="filled"
                      value={email}
                      error={checkEmail}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      size={"small"}
                      color="secondary"
                      sx={{ backgroundColor: "white", borderRadius: "5px" }}
                      required
                      fullWidth
                      variant="filled"
                    >
                      <InputLabel htmlFor="filled-adornment-password">
                        Password
                      </InputLabel>
                      <FilledInput
                        name="password"
                        type={showPassword ? "text" : "password"}
                        id="password"
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <FormControlLabel
                  sx={{ mt: "1rem", color: "white" }}
                  control={
                    <Checkbox
                      sx={{
                        color: "white !important",
                      }}
                      value="remember"
                      size="small"
                    />
                  }
                  label="Remember me"
                />
                <Button
                  className="lightButton"
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2, mb: 2 }}
                  onClick={() => {
                    userStore.login(email, password);
                  }}
                >
                  Log In
                </Button>
                <Grid container mb="1rem">
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href={"/auth"} variant="body2">
                      Don't have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default observer(Login);
