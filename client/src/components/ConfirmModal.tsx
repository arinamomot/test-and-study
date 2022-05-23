import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "rgb(0,0,0)",
        },
        secondary: {
            main: "rgb(255,255,255)",
        },
    },
});


interface ConfirmModalProps {
  title: string;
  text: string;
  open: boolean;
  onConfirm: Function;
  setOpen: (open: boolean) => void;
}

const ConfirmModal = ({
  title,
  text,
  open,
  setOpen,
  onConfirm,
}: ConfirmModalProps) => {
  return (
      <ThemeProvider theme={theme}>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
      <Divider />
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button
          className="redButton"
          variant="outlined"
          onClick={() => setOpen(false)}
        >
          No
        </Button>
        <Button
          className="darkButton"
          variant="outlined"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
      </ThemeProvider>
  );
};

export default ConfirmModal;
