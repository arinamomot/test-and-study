import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface InfoProps {
  setOpen: (open: boolean) => void;
}

const InfoAbout = ({ setOpen }: InfoProps) => {
  return (
    <Box className="mainSpace">
      <Button
        className="lightButton"
        sx={{ m: "1rem" }}
        onClick={() => setOpen(false)}
        variant="outlined"
      >
        <ArrowBackIcon sx={{ mr: "0.5rem" }} fontSize="small" />
        Hide
      </Button>
      <Typography variant="h4" color="white" textAlign="center">
        What is Test&Study?
      </Typography>
      <Typography display="block" color="white" m="2rem">
        Test&Study is a simple and free test builder that allows you to easily
        create tests with different types of questions, share them with other
        users of the site and view the results. You can also run the test with
        only wrong answers and study the material better. With this application,
        you can quickly and easily prepare for an exam or test students'
        knowledge.
        <br />
        <br />
        Using the test builder Test&Study, you can create different types of
        questions and answers: <br />
        <br />
        1. Choose one answer option from several suggested ones;
        <br />
        2. Choose several possible answers from the suggested ones;
        <br />
        3. Enter the missing word in the spaces in the question;
        <br />
        4. Write a detailed answer to the question;
        <br />
        5. Choose a true or false statement.
        <br />
        <br />
        After registration, you will have access to all its features. <br />
        Let's try it right now and enjoy testing!
        <br />
        <br />
      </Typography>
    </Box>
  );
};

export default InfoAbout;
