import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

const CreateNewTest = () => {
  return (
    <Box sx={{ pr: 7 }}>
      <Typography paragraph>
        To create a new test on the main page of the application, click on the
        "Create new test" button.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/testsCreateTest.png"}
        alt="testsCreateTest"
      />
      <Typography paragraph>
        Next, in the modal window that appears, fill in all the necessary fields
        and click the "Create" button.{" "}
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/createTest.png"}
        alt="createTest"
      />
      <Typography paragraph>
        {" "}
        After that, you will be automatically redirected to the test page for
        further editing.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/test.png"}
        alt="test"
      />
      <img
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/newTest.png"}
        alt="newTest"
      />
      <img
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/noResponses.png"}
        alt="noResponses"
      />
      <img
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/noMembers.png"}
        alt="noMembers"
      />
    </Box>
  );
};

export default observer(CreateNewTest);
