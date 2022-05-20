import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { Context } from "../pages/_app";
import Clean from "../utils/clean";
import Logo from "./Logo";

const settings = ["My account", "Logout"];

const Header = () => {
  const { userStore } = useContext(Context);
  const [avatar, setAvatar] = useState<string>("");
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItem = async (setting: string) => {
    switch (setting) {
      case "My account":
        await Clean.cleanLocalStorage();
        await Router.push("/account");
        break;
      case "Logout":
        await userStore.logout();
        await Router.push("/login");
        break;
    }
  };

  const handleClick = async () => {
    await Clean.cleanLocalStorage();
    await Router.push("/main");
  };

  const getAvatar = async () => {
    const avatarPhoto = await userStore.getUserAvatar();
    if (avatarPhoto) setAvatar(avatarPhoto);
  };

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <AppBar
      sx={{ backgroundColor: "#191919", width: "100%" }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo width={"40px"} height={"40px"} />
          <Typography
            onClick={handleClick}
            sx={{ cursor: "pointer" }}
            ml={1}
            variant="h6"
          >
            Test&Study
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User avatar"
                  src={avatar ? `/uploads/${avatar}` : ""}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleMenuItem(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default observer(Header);
