import Auth from "../components/Auth";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";

function AuthPage() {
  return (
    <>
      <Box className="body" minHeight="100vh">
        <Auth />
        <Box sx={{ height: "0.5rem" }} />
      </Box>
      <Footer />
    </>
  );
}

export default AuthPage;
