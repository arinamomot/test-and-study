import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Router from "next/router";
import Clean from "../utils/clean";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0,0,0)",
    },
    secondary: {
      main: "rgb(255,255,255)",
    },
  },
});

const MainButtons = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
      <Box sx={{ mt: "5rem" }} justifyContent={"center"} display="flex">
        <Button
          className="darkButton"
          fullWidth
          sx={{ width: "20%", mr: "3%" }}
          variant="outlined"
          onClick={() => {
            Clean.cleanLocalStorage();
            Router.push("/main");
          }}
        >
          Main page
        </Button>
        <Button
          className="darkButton"
          fullWidth
          sx={{ width: "20%", mr: "3%" }}
          variant="outlined"
          onClick={() => Router.push("/tests")}
        >
          Tests
        </Button>
        <Button
          className="darkButton"
          fullWidth
          sx={{ width: "20%", mr: "3%" }}
          variant="outlined"
          onClick={() => Router.push("/responses")}
        >
          Responses
        </Button>
        <Button
          className="darkButton"
          sx={{ width: "20%" }}
          fullWidth
          variant="outlined"
          onClick={() => Router.push("/docs")}
        >
          Documentation
        </Button>
      </Box>
      </ThemeProvider>
    </>
  );
};

export default MainButtons;
