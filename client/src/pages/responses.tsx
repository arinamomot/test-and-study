import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainButtons from "../components/MainButtons";
import ResponsesContent from "../components/ResponsesContent";
import { useContext, useEffect } from "react";
import { Context } from "./_app";
import { CircularProgress, Stack } from "@mui/material";

function Responses() {
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
        <ResponsesContent />
      </Box>
      <Footer />
    </>
  );
}

export default observer(Responses);
