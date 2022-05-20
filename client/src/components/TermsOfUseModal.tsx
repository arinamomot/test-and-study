import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface TermsOfUseModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setCheck: (check: boolean) => void;
}

const TermsOfUseModal = ({ open, setOpen, setCheck }: TermsOfUseModalProps) => {
  const handleClose = () => setOpen(false);
  const handleAccept = () => {
    setOpen(false);
    setCheck(true);
  };

  return (
    <Dialog open={open} maxWidth="xs">
      <DialogTitle sx={{ m: 0, p: 2 }}>Terms of use</DialogTitle>
      <DialogContent sx={{ pr: 4, pl: 4 }}>
        <Typography id="modal-text" sx={{ mt: 1 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </Typography>
        <Button
          className="darkButton"
          sx={{ m: 1, float: "left" }}
          variant="outlined"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          className="actionButton"
          sx={{ m: 1, float: "right" }}
          variant="contained"
          onClick={handleAccept}
        >
          Accept
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfUseModal;
