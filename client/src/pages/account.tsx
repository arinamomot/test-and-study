import { CircularProgress, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import AccountBasicInfo from "../components/AccountBasicInfo";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Context } from "./_app";

function Account() {
  const { userStore } = useContext(Context);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      userStore.notAuth();
    } else {
      userStore.checkAuth();
    }
  }, []);

  if (userStore.isLoading) {
    return (
      <Stack alignItems="center" mt="50vh">
        {" "}
        <CircularProgress />{" "}
      </Stack>
    );
  }

  return (
    <>
      <Box minHeight="100vh">
        <Header />
        <Typography textAlign="center" pt="4%" m="2rem" variant="h5">
          Personal information
        </Typography>
        <AccountBasicInfo />
      </Box>
      <Footer />
    </>
  );
}

export default observer(Account);
