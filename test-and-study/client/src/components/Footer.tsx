import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Logo from "./Logo";

const Footer = () => {
  return (
    <Box
      width="100%"
      p="0.5rem"
      sx={{ marginTop: "auto", backgroundColor: "#191919" }}
    >
      <Typography variant="body2" color="lightgray" align="center" m="2rem">
        <Logo width={"20px"} height={"20px"} /> ©{new Date().getFullYear()}{" "}
        Test&Study
      </Typography>
    </Box>
  );
};

export default Footer;
