import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { observer } from "mobx-react-lite";
import Clean from "../utils/clean";

interface BackButtonProps {
  href: string;
  pageName?: string;
  className?: string;
}

const BackButton = ({ href, className, pageName }: BackButtonProps) => {
  const handleClick = async () => {
    await Clean.cleanLocalStorage();
  };

  return (
    <Button
      href={href}
      className={className ? className : "lightButton"}
      variant="outlined"
      sx={{ m: "1rem" }}
      onClick={handleClick}
    >
      <ArrowBackIcon sx={{ mr: "0.5rem" }} fontSize="small" />
      Back to the {pageName} page
    </Button>
  );
};

export default observer(BackButton);
