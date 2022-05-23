import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import TypeAnimation from "react-type-animation";
import { SetStateAction, useState } from "react";
import styles from "../styles/Home2.module.scss";
import Footer from "./Footer";
import InfoAbout from "./InfoAbout";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
const MainPageContent = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: any, newValue: SetStateAction<number>) => {
    setValue(newValue);
  };

  const [info, setInfo] = useState(false);

  return (
    <>
      <ThemeProvider theme={theme}>
      <Box className="body" height="100vh">
        {info && <InfoAbout setOpen={setInfo} />}
        <TypeAnimation
          className={styles.type}
          cursor={true}
          sequence={[
            "Create and pass tests easily.",
            4000,
            "Check your knowledge before the exam.",
            4000,
          ]}
          wrapper="h1"
          repeat={Infinity}
        />
        <Box className={styles.block}>
          <Typography
            width={info ? "60%" : "35%"}
            className={styles.mainText}
            variant={info ? "h6" : "h5"}
          >
            Free multifunctional service for easy creation and passing of tests.
          </Typography>
        </Box>
        <Box className={styles.buttons}>
          <Button
            href={"/auth"}
            className="lightButton"
            sx={{ mr: "2rem" }}
            variant="outlined"
          >
            Try it now
          </Button>
          <Button
            href={"/login"}
            className="lightButton"
            sx={{ mr: "2rem" }}
            variant="outlined"
          >
            Log In
          </Button>
          <Button
            className="lightButton"
            onClick={() => setInfo((prevInfo) => !prevInfo)}
            variant="outlined"
          >
            Learn more
          </Button>
        </Box>
      </Box>
      <Footer />
      </ThemeProvider>
    </>
  );
};

export default observer(MainPageContent);
