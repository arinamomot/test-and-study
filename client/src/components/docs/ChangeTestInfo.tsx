import { Box, Chip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

const ChangeTestInfo = () => {
  return (
    <Box sx={{ pr: 7 }}>
      <Typography paragraph>
        After creating a test, you can add new information to it or change the
        one that already exists. You can change the title, description, and type
        of the test, as well as add a topic and subtopic to it. <br />
        <br />
        <b>Time:</b> you can also set the time for taking the test, for this you
        need to enable switcher "Use time" and enter the number of minutes. Min:
        1min - Max: 200min.
        <br />
        <b>Self-evaluation: </b>enabling this feature will allow users to
        evaluate text questions on their own (based on the answer feedback) and
        add points for them after completing the test.
        <Chip
          label='Attention! All changes made to the test must be saved by clicking on the "Save" button.
            Unsaved changes will be lost.'
          color="warning"
          sx={{ mt: 2, textAlign: "right" }}
        />
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/testEvaluation.png"}
        alt="testEvaluation"
      />
      <Typography paragraph>
        <b>Color: </b>You can also change the color of the test. To do this,
        click on the palette icon. You will see a pull down menu with a
        selection of available colors. After clicking on one of them, the test
        will change its color.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/colorBeige.png"}
        alt="colorBeige"
      />
      <Typography paragraph>
        <b>Test type: </b> you can choose 1 of 2 test types: <br />
        - Scored - scoring test. In such a test, each question can be rated from
        0 to 5 points. At the end of the test, the test participant will receive
        the result and will see how many points he/she has gained from the
        maximum possible number.
        <br />- Nonscored - unscored test. In such a test, the questions do not
        have a score.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/testTypes.png"}
        alt="testTypes"
      />
      <Typography paragraph>
        <b>Image: </b>you can add a test image by clicking on the camera icon.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/testImage.png"}
        alt="test"
      />
      <Typography>
        Then select a picture from your computer and click on the "Upload"
        button.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/testImageUpload.png"}
        alt="test"
      />
      <Typography>Done, your test now has an image.</Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/testImageUploaded.png"}
        alt="testImageUploaded"
      />
    </Box>
  );
};

export default observer(ChangeTestInfo);