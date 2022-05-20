import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/material";
import { StyledEngineProvider } from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useEffect } from "react";
import { Context } from "../_app";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TestView from "../../components/tests/test/TestView";
function Test() {
  const { userStore } = useContext(Context);
  const { testStore } = useContext(Context);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      userStore.notAuth();
    } else {
      userStore.checkAuth();
      if (localStorage.getItem("testId")) {
        testStore.getAllQuestionsByTestId(localStorage.getItem("testId"));
        testStore.getTestById(localStorage.getItem("testId"));
        testStore.getTestTypesStore();
      }
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

  if (testStore.isLoading) {
    return (
      <Stack alignItems="center" mt="50vh">
        {" "}
        <CircularProgress />{" "}
      </Stack>
    );
  }

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Box minHeight="100vh">
          <Header />
          <TestView />
        </Box>
        <Footer />
      </StyledEngineProvider>
    </>
  );
}

export default observer(Test);
