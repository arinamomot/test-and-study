import { observer } from "mobx-react-lite";
import { Box, Chip, Typography } from "@mui/material";

const TestActions = () => {
  return (
    <Box sx={{ pr: 7 }}>
      <Typography>
        <b>Save test:</b> if you are a test creator in creation mode you can
        save your test in PDF format. To do this, click on the button "Save as
        PDF". Next, select a location on your computer where the document will
        be saved and click on "Save" button.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="330px"
        src="../../../static/docs/saveTest.png"
        alt="saveTest"
      />
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="380px"
        src="../../../static/docs/saveTest2.png"
        alt="saveTest2"
      />

      <Typography>
        <b>Test preview:</b> first you need to add at least one question to the
        test. Then click on the eye icon in the upper right corner. You will be
        redirected to a page with preview of the test.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/preview1.png"
        alt="preview1"
      />

      <Typography>
        If the test <b>uses time</b>, you will also see a timer that can be
        stopped or re-enabled on the preview page.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/preview2.png"
        alt="preview2"
      />

      <Typography>
        <b>Share test:</b> click on the share icon in the upper right corner.
        Next, a modal window for user search will appear.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/share1.png"
        alt="share1"
      />
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/share2.png"
        alt="share2"
      />
      <Typography>
        The search is carried out by e-mail users. Write the required name,
        select a user from the list and click on it. Next, you need to click on
        the button "Share".
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/share3.png"
        alt="share3"
      />
      <Typography>
        Done, test successfully shared. <br />
        Now in the members tab, you can <b>see all the test members</b>. <br />
        <br />
        By clicking on the trash icon you can{" "}
        <b>remove a user from test members</b>. <br />
        <br />
        You can also <b>remove all test members</b> at once by clicking on the
        button "Delete all members".
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/share4.png"
        alt="share4"
      />

      <Typography>
        <b>Run test:</b> If you are the <b>creator of the test</b>, then you can
        run it directly from the creation mode by clicking on the play icon in
        the upper right corner. You will be redirected to a new page for passing
        the test.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/run1.png"
        alt="run1"
      />
      <Typography>
        You can <b>run the test</b> from the main page, from tests page and from
        the responses page by clicking on the "Run" button.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/run2.png"
        alt="run2"
      />
      <Typography>
        On the test page, you will see information about the test and the
        questions that need to be completed. If the test <b>uses time</b> on the
        right, you will also see a timer. Click the "Submit" button to submit
        the test.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/run3.png"
        alt="run3"
      />
      <Typography>
        You must complete all required fields to complete the test.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/run4.png"
        alt="run4"
      />

      <Typography>
        <b>Response: </b>after submitting the test, you will be redirected to
        the <b>test result page</b>. If the test is <b>"SCORED"</b>, then on
        this page you will see your points. <br />
        Clicking the button "Back to the main page" will take you back to the
        main page of the site.
        <br />
        By clicking on the button "View answers" you can{" "}
        <b>view your answers</b>.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/submitTest1.png"
        alt="submitTest1"
      />
      <Typography>
        Each question is marked with colors: <br />
        - Red - the answer to the question was given incorrectly; <br />
        - Green - you answered the question correctly.
        <br />
        <br />
        By clicking on the button "Show correct answers" you can{" "}
        <b>view correct answers</b> to the questions.
        <br />
        <br />
        In the upper right corner of each answer is written the number of points
        you have scored and the maximum number of points for the question.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/testSub.png"
        alt="testSub"
      />
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/testSub2.png"
        alt="testSub2"
      />

      <Typography>
        If the test allows <b>self-evaluation</b> of text questions or you are
        the <b>creator</b> of the test, then using the checkbox "Answer is
        correct" you can mark the answer as correct. Points for this question
        will be added automatically.
        <br />
        <Chip
          label='Attention! All changes made to the answers must be saved by clicking on the "Save" button.
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
        src="../../../static/docs/testSub5.png"
        alt="testSub5"
      />

      <Typography>
        <b>Save answer as PDF:</b> to save your answer in PDF format, you have
        to click on the button "Save as PDF". Next, select a location on your
        computer where the document will be saved and click on "Save" button.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/saveAnswer1.png"
        alt="saveAnswer1"
      />
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="380px"
        src="../../../static/docs/saveAnswer2.png"
        alt="saveAnswer2"
      />

      <Typography>
        <b>Responses tab in creation mode:</b> test creators can <b>view</b> and
        if needed <b>grade all the responses</b> to the test they created in the
        responses tab.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/responsesAll.png"
        alt="responsesAll"
      />
      <Typography>
        You can also <b>export responses</b> in two formats: Excel and CSV by
        clicking on "Export to Excel" or "Export to CSV" button. Exports contain
        convenient tables with detailed information about all the responses of
        test members. <br />
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/responsesExports.png"
        alt="responsesExports"
      />
      <Typography>
        <b>Tip: </b>to correctly display the table in the CSV format, you can
        open it in Microsoft Excel, go to section "Data" -{">"} select "From
        Text/CSV" option, download the CSV file with members responses and click
        on "Load" button. After completing these steps, you will have a
        beautiful table.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/responsesCSV.png"
        alt="responsesCSV"
      />
    </Box>
  );
};

export default observer(TestActions);
