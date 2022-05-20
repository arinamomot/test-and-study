import { CircularProgress, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainButtons from "../components/MainButtons";
import MainSection from "../components/MainSection";
import { Context } from "./_app";

const Main = () => {
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
        <Box className="mainSection">
          <MainSection title={"Recently created tests"} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default observer(Main);
