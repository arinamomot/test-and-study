import CloseIcon from "@mui/icons-material/Close";
import { FormControl, InputLabel, Select, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect, useState } from "react";
import { ITestType } from "../models/ITestType";
import { Context } from "../pages/_app";
import TestService from "../services/TestService";

interface CreateDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setTestCreated: Function;
}

const CreateDialog = ({ open, setOpen, setTestCreated }: CreateDialogProps) => {
  const { testStore } = useContext(Context);
  const [testType, setTestType] = useState("");
  const [testTypes, setTestTypes] = useState<ITestType[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function getTestTypes() {
    try {
      const response = await TestService.getTestTypes();
      setTestTypes(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getTestTypes();
  }, []);

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setTestType("");
    setOpen(false);
  };

  const handleCreate = async () => {
    await testStore.createTest(title, description, testType);
    setTestCreated();
    handleClose();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Create Test
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
      <DialogContent>
        <TextField
          sx={{ mb: 2 }}
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="filled"
        />
        <TextField
          sx={{ mb: 2 }}
          id="description"
          label="Description"
          name="description"
          multiline
          fullWidth
          rows={3}
          variant="filled"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl variant="filled" fullWidth>
          <InputLabel id="select">Type *</InputLabel>
          <Select
            required
            labelId="select"
            id="select"
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
          >
            {testTypes.map((type) => (
              <MenuItem key={type.testType} value={type.testType}>
                {type.testType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          className="actionButton"
          sx={{ m: 2, float: "right" }}
          variant="contained"
          onClick={handleCreate}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDialog;
