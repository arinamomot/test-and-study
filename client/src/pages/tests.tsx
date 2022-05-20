import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainButtons from "../components/MainButtons";
import TestComp from "../components/tests/TestsComp";
import { Context } from "./_app";
function Tests() {
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
        <MainButtons />
        <TestComp />
      </Box>
      <Footer />
    </>
  );
}

export default observer(Tests);
