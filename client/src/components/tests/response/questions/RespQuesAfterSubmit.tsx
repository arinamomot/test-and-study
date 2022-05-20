import {
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Input,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { IAnswer } from "../../../../models/IAnswer";
import { IQuestion } from "../../../../models/IQuestion";
import { ITest } from "../../../../models/ITest";
import { ITopic } from "../../../../models/ITopic";
import { Context } from "../../../../pages/_app";

interface QuestionProps {
  test: ITest;
  type: boolean;
  testId: string;
  questionsFromProps: IQuestion[];
  topicsFromProps: ITopic[];
  color?: string | null;
  onChange?: Function;
}

const RespQuesAfterSubmit = ({
  test,
  type,
  testId,
  questionsFromProps,
  topicsFromProps,
  color,
  onChange,
}: QuestionProps) => {
  const { testStore } = useContext(Context);
  const [questions, setQuestions] = useState<IQuestion[]>(
    testStore.getQuestions()
  );

  let answers: IAnswer[] = [];
  let currentUser: string | null = "";

  if (typeof window !== "undefined") {
    if (localStorage.getItem("userAnswers"))
      answers = JSON.parse(localStorage.getItem("userAnswers") || "");
    if (localStorage.getItem("currentUser"))
      currentUser = localStorage.getItem("currentUser");
  }

  if (answers.length > 0) {
    checkAnswers();
  }

  const [topics, setTopics] = useState<ITopic[]>(
    testStore.getQuestionsTopics()
  );
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);

  const [checkedList, setCheckedList] = useState<any>(
    new Array(answers.length).fill(false)
  );
  const [points, setPoints] = useState<any>(new Array(answers.length).fill(0));

  useEffect(() => {
    setQuestions(questionsFromProps);
    setTopics(topicsFromProps);
    checkAnswers();

    const updatedState = [...checkedList];
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].isCorrect) {
        updatedState[i] = true;
      }
    }
    setCheckedList(updatedState);

    const updatedPoints = [...points];
    for (let i = 0; i < answers.length; i++) {
      updatedPoints[i] = answers[i].userPoints;
    }
    setPoints(updatedPoints);
  }, []);

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const updatedPoints = [...points];
    const updatedState = checkedList.map((item: any, index: number) =>
      index === i ? !item : item
    );
    if (updatedState[i] === true) {
      updatedPoints[i] = answers[i].questionPoints;
      setPoints(updatedPoints);
      answers[i].userPoints = answers[i].questionPoints;
      answers[i].isCorrect = true;
      localStorage.setItem("userAnswers", JSON.stringify(answers));
      setCheckedList(updatedState);
      if (onChange) onChange();
    } else {
      updatedPoints[i] = 0;
      setPoints(updatedPoints);
      answers[i].userPoints = 0;
      answers[i].isCorrect = false;
      localStorage.setItem("userAnswers", JSON.stringify(answers));
      setCheckedList(updatedState);
      if (onChange) onChange();
    }
  };

  const handleSave = async () => {
    const answersForSave: IAnswer[] = JSON.parse(
      localStorage.getItem("userAnswers") || ""
    );
    const responseId: string | null = localStorage.getItem("responseId");
    await testStore.updateResponse(responseId, answersForSave);
  };

  function checkAnswers() {
    if (answers) {
      for (const answer of answers) {
        answer.userPoints = answer.questionPoints;
        if (answer.correctAnswers.length > 0) {
          if (answer.userAnswers.length === answer.correctAnswers.length) {
            answer.isCorrect = true;
            for (const answerU of answer.userAnswers) {
              if (!answer.correctAnswers.includes(answerU))
                answer.isCorrect = false;
            }
          }
        }
        if (!answer.isCorrect) answer.userPoints = 0;
      }
    }
  }

  function borderColor(i: number) {
    if (checkedList[i] === true) return "green";
    return "red";
  }

  function questionsUI() {
    return questions.map((ques: any, i: number) => (
      <Box key={i}>
        <Box>
          <Box sx={{ marginBottom: "2rem" }}>
            <Box
              sx={{
                borderRadius: "8px",
                border: "1.5px solid",
                borderColor: `${borderColor(i)}`,
                backgroundColor: `${color} !important`,
              }}
            >
              <Box
                sx={{
                  backgroundColor: `${color} !important`,
                  width: "100%",
                  borderRadius: "8px",
                }}
              >
                {(localStorage.getItem("points") !== null ||
                  ques.questionPoints !== 0) && (
                  <Chip
                    size="small"
                    sx={{ width: "100px", float: "right", m: 2 }}
                    label={`Points: ${points[i]} / ${answers[i].questionPoints}`}
                  />
                )}
                <Box
                  sx={{ backgroundColor: `${color} !important` }}
                  className="saved_questions"
                >
                  <Typography
                    sx={{
                      textAlign: "left",
                      backgroundColor: `${color} !important`,
                      fontSize: "15px",
                      fontWeight: "400",
                      letterSpacing: ".1px",
                      lineHeight: "24px",
                      paddingBottom: "8px",
                    }}
                  >
                    {i + 1}. {ques.questionText}
                  </Typography>
                  <Box>
                    {ques.options.map((op: any, j: any) => (
                      <Box
                        className="add_question_body"
                        key={j}
                        sx={{
                          marginLeft: "8px",
                          marginTop: "5px",
                          backgroundColor: `${color} !important`,
                        }}
                      >
                        <Box key={j}>
                          <Box sx={{ display: "flex" }}>
                            <Box>
                              {ques.questionType != "text" ? (
                                <label
                                  className="fontLabel"
                                  style={{
                                    fontFamily: `"Roboto","Helvetica","Arial",sans-serif}`,
                                    backgroundColor: `${color} !important`,
                                  }}
                                >
                                  <input
                                    disabled
                                    type={ques.questionType}
                                    required={ques.required}
                                    defaultChecked={answers[
                                      i
                                    ]?.userAnswers.includes(ques.options[j])}
                                    style={{
                                      backgroundColor: `${color} !important`,
                                      marginRight: "10px",
                                      marginBottom: "10px",
                                      marginTop: "5px",
                                    }}
                                  />
                                  {ques.options[j]}
                                </label>
                              ) : (
                                <Box>
                                  <label
                                    style={{
                                      fontSize: "13px",
                                      backgroundColor: `${color} !important`,
                                    }}
                                  >
                                    <Input
                                      disabled
                                      value={answers[i]?.userAnswers}
                                      type={ques.questionType}
                                      required={ques.required}
                                      style={{
                                        backgroundColor: `${color} !important`,
                                        marginRight: "10px",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                    />
                                  </label>
                                  {test.evaluation &&
                                    test.creator !== currentUser && (
                                      <FormControlLabel
                                        label="Answer is correct?"
                                        control={
                                          <Checkbox
                                            id={answers[i].id}
                                            size="small"
                                            value={answers[i]?.isCorrect}
                                            checked={answers[i]?.isCorrect}
                                            onChange={(e) => handleChange(e, i)}
                                          />
                                        }
                                      />
                                    )}
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  {test.creator === currentUser && (
                    <FormControlLabel
                      label="Answer is correct?"
                      control={
                        <Checkbox
                          id={answers[i].id}
                          name={answers[i].id}
                          size="small"
                          // value={answers[i]?.isCorrect}
                          // checked={answers[i]?.isCorrect}
                          checked={checkedList[i]}
                          onChange={(e) => handleChange(e, i)}
                        />
                      }
                    />
                  )}
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  {answers[i].answerFeedback && (
                    <Typography sx={{ ml: 4, pb: 2 }} variant="body2">
                      <b>Answer note: </b>
                      {answers[i].answerFeedback}
                    </Typography>
                  )}
                  {showCorrectAnswer && answers[i].correctAnswers.length > 0 && (
                    <Box>
                      <Divider sx={{ width: "90%", ml: 4 }} />
                      <Typography sx={{ ml: 4, mt: 2, pb: 2 }} variant="body2">
                        <b>Correct answer(s):</b>{" "}
                        {answers[i].correctAnswers.join(", ")}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    ));
  }

  return (
    <Box>
      <Box sx={{ textAlign: "left" }}>
        <Button
          size="small"
          sx={{ border: "1px solid black", ml: 4, mt: 2, mb: 2 }}
          className="darkButton"
          onClick={() => {
            setShowCorrectAnswer((prevState) => !prevState);
          }}
        >
          {showCorrectAnswer ? "Hide " : "Show "}correct answers
        </Button>
      </Box>
      {questionsUI()}
      <Box sx={{ textAlign: "right" }}>
        <Button
          onClick={() => window.print()}
          className="darkButton"
          sx={{ mr: 2, border: "1px solid black" }}
        >
          Save as PDF
        </Button>
        {!test.evaluation && test.creator !== currentUser && (
          <Button
            disabled={!test.evaluation}
            onClick={handleSave}
            className="actionButton"
            sx={{ mr: 2 }}
          >
            Save
          </Button>
        )}
        {test.creator === currentUser && (
          <Button onClick={handleSave} className="actionButton" sx={{ mr: 2 }}>
            Save
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default observer(RespQuesAfterSubmit);
