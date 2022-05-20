import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

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
  );
};

export default ConfirmModal;
