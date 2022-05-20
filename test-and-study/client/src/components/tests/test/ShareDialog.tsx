import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { IUser } from "../../../models/IUser";
import { Context } from "../../../pages/_app";
import AlertComp from "../../AlertComp";

interface ShareDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  testId: string;
}

const ShareDialog = ({ open, setOpen, testId }: ShareDialogProps) => {
  const { userStore } = useContext(Context);
  const { testStore } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");
  const [userForShare, setUserForShare] = useState<string>("");

  const getAllUsers = async () => {
    const response = await userStore.getAllUsers();
    if (response) {
      setUsers(response.data.users);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleClose = () => {
    setSearch("");
    setUserForShare("");
    setSearchResults([]);
    setOpen(false);
  };

  const handleUserForShare = (email: string) => {
    setUserForShare(email);
    setSearch(email);
  };

  const handleShare = async () => {
    const response = await testStore.shareTest(userForShare, testId);
    if (response?.data.error === "") handleClose();
  };

  const searchUser = (search: any) => {
    setSearch(search);
    if (search.trim()) {
      const newUsersList = users.filter((user) => {
        return Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResults(newUsersList);
    } else {
      setSearchResults(users);
    }
  };

  return (
    <>
      {testStore.alertBox.show && (
        <AlertComp
          type={testStore.alertBox.type}
          message={testStore.alertBox.message}
        />
      )}
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Share Test
          {open ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent sx={{ height: "200px" }}>
          <TextField
            sx={{ border: "none", mt: 2 }}
            id="search"
            placeholder="Search user"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => searchUser(e.target.value)}
          />
          {search !== "" && searchResults.length > 0 && (
            <List>
              {searchResults.map((user: IUser, index: number) => (
                <ListItem
                  onClick={() => handleUserForShare(user.email)}
                  key={index}
                  sx={{
                    cursor: "pointer",
                    borderBottom: "1px solid lightgray",
                    mt: 1,
                  }}
                >
                  <ListItemText
                    primary={user.email}
                    secondary={`${user.firstName} ${user.lastName}`}
                  />
                </ListItem>
              ))}
              {/*    /!*{users.map((user: IUser) => (*!/*/}
              {/*    /!*    <ListItem>*!/*/}
              {/*    /!*        <ListItemText*!/*/}
              {/*    /!*            primary={user.email}*!/*/}
              {/*    /!*        />*!/*/}
              {/*    /!*    </ListItem>*!/*/}
              {/*    /!*))}*!/*/}
            </List>
          )}
          {search !== "" && searchResults.length === 0 && (
            <Typography mt={2} textAlign="center">
              No users found.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            className="actionButton"
            sx={{ m: 2, float: "right" }}
            variant="contained"
            onClick={handleShare}
          >
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default observer(ShareDialog);
