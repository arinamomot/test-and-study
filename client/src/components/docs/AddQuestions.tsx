import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

const AddQuestions = () => {
  return (
    <Box sx={{ pr: 7 }}>
      <Typography>
        <b>To add a new question</b> to the test, click on the plus icon and the
        new question will immediately appear.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/addQues.png"}
        alt="addQuestion"
      />
      <Typography>
        <b>Change question:</b> in the new section of the question, you can
        complete the field with the text of the question, add up to 5 options,
        using switcher "Required" change if question is mandatory or not, add a
        subject and note to the question. <br />
        Using the icons you can <b>copy</b> or <b>delete</b> a question.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/question.png"}
        alt="question"
      />
      <Typography>
        You can <b>change the question type</b> to 1 of the 3 available: <br />
        1. Text - an open-ended question. Supplier can reply with a free text up
        to 1000 characters; <br />
        2. Multiple Choice - suppliers can choose multiple responses from a
        predetermined list you define. This is a closed-ended question.
        <br />
        3. Single Choice - suppliers can only choose one response from a
        predetermined list you define. This is a closed-ended question.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="385x"
        src={"../docs/questionTypes.png"}
        alt="quesTypes"
      />
      <Typography>
        <b>Question example </b>
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/question2.png"}
        alt="question"
      />
      <Typography>
        <b>Add answer to the question:</b> to add an answer to a question, click
        on the button "Answer key".
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/answerKey.png"}
        alt="answerKey"
      />

      <Typography>
        For Multiple and Single Choice questions You can <b>select</b> right
        answers by clicking on the radio/checkbox buttons.
        <br />
        If the test is <b>SCORED</b>, then you can specify the number of points
        for answering this question. Min: 0 - Max: 5. If the test is{" "}
        <b>NONSCORED</b>, then this field will be disabled.
        <br />
        You can <b>add answer feedback(note) to the answer</b> by clicking on
        the button "Add Answer Feedback". <br />
        <b>To save the answer</b> click on the button "Done". <br />
        <b>To completely clear the answer</b> click on the button "Delete".
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/answerView.png"}
        alt="answerView"
      />

      <Typography>
        You can <b>delete answer feedback(note) to the answer</b> by clicking on
        the button "Delete Answer Feedback".
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/deleteAnsFeed.png"}
        alt="deleteAnsFeed"
      />
      <Typography>
        For text questions, it is <b>recommended</b> to fill in this section
        with the correct answer.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/textAnswer.png"}
        alt="textAnswer"
      />

      <Typography>
        <b>Changing the order of questions:</b> you can change the order of the
        questions using the method Drag and Drop. Just take one question and
        drag it to a new position.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src={"../docs/changeOrder.png"}
        alt="changeOrder"
      />
    </Box>
  );
};

export default observer(AddQuestions);
