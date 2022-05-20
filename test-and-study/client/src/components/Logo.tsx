import Box from "@mui/material/Box";
import Router from "next/router";
import Clean from "../utils/clean";

interface LogoProps {
  width: string;
  height: string;
}

const Logo = ({ width, height }: LogoProps) => {
  const handleClick = async () => {
    await Clean.cleanLocalStorage();
    await Router.push("/main");
  };

  return (
    <Box onClick={handleClick} sx={{ cursor: "pointer" }}>
      <img width={width} height={height} src={'../images/logo.svg'} />
    </Box>
  );
};

export default Logo;
