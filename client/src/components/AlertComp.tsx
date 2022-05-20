import { Alert } from "@mui/material";
import { AlertColor } from "@mui/material";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import { useContext } from "react";
import { useEffect } from "react";
import { Context } from "../pages/_app";

interface AlertCompProps {
  type: AlertColor;
  message: string;
}

const AlertComp = ({ type, message }: AlertCompProps) => {
  const { userStore } = useContext(Context);

  useEffect(() => {
    const timeId = setTimeout(() => {
      runInAction(() => {
        userStore.alertBox.show = false;
      });
      // userStore.alertBox.show = false;
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <Alert
      variant="filled"
      severity={type}
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "100",
      }}
    >
      {message}
    </Alert>
  );
};

export default observer(AlertComp);
