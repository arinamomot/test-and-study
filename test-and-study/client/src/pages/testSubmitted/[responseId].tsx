import Box from "@mui/material/Box";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TestSubmittedPage from "../../components/tests/TestSubmittedPage";

const TestSubmitted = () => {
  return (
    <>
      <Box minHeight="100vh">
        <Header />
        <TestSubmittedPage />
      </Box>
      <Footer />
    </>
  );
};

export default TestSubmitted;
