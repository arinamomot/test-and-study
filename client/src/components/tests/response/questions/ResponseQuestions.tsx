import { Button, Chip, Input, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { IAnswer } from "../../../../models/IAnswer";
import { IQuestion } from "../../../../models/IQuestion";
import { IResponse } from "../../../../models/IResponse";
import { ITopic } from "../../../../models/ITopic";
import { Context } from "../../../../pages/_app";
import MyTimer from "../../test/MyTimer";

interface QuestionProps {
  time: number;
  type: boolean;
  testId: string;
  questionsFromProps: IQuestion[];
  topicsFromProps: ITopic[];
  color?: string | null;
}

const ResponseQuestions = ({
  time,
  type,
  testId,
  questionsFromProps,
  topicsFromProps,
  color,
}: QuestionProps) => {
  const { testStore } = useContext(Context);
  const [questions, setQuestions] = useState<IQuestion[]>(
    testStore.getQuestions()
  );

  const timer = new Date();
  timer.setSeconds(timer.getSeconds() + time * 60);

  const [answers, setAnswers] = useState<IAnswer[]>([]);
  let [answer, setAnswer] = useState<IAnswer>();
  const [testResponse, setTestResponse] = useState<IResponse>({
    id: "",
    test: testId,
    time: 0, //the time for which the test was completed
    userPoints: 0,
    answers: [],
    maxPoints: 0,
    user: "",
    questions: [],
    creationDate: new Date(),
    evaluation: false,
  });
  const [topics, setTopics] = useState<ITopic[]>(
    testStore.getQuestionsTopics()
  );
  const [questionType, setType] = useState<string>("radio");
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);

  let preview: boolean = false;

  useEffect(() => {
    setQuestions(questionsFromProps);
    setTopics(topicsFromProps);

    if (typeof window !== "undefined") {
      if (localStorage.getItem("preview"))
        preview = JSON.parse(localStorage.getItem("preview") || "");
    }
  }, []);

  useEffect(() => {
    let answersBase = [];
    for (let i = 0; i < questions.length; i++) {
      answer = {
        id: "",
        question: questions[i].id,
        userAnswers: [],
        userPoints: 0,
        questionPoints: questions[i].points,
        test: testId,
        correctAnswers: [],
        required: questions[i].required,
        user: "",
        creationDate: new Date(),
        answerFeedback: questions[i].answerFeedback,
      };
      answersBase.push(answer);
    }
    setAnswers(answersBase);
  }, [questions]);

  const handleResponse = async () => {
    let timerOver: boolean = false;
    if (localStorage.getItem("timerOver"))
      timerOver = JSON.parse(localStorage.getItem("timerOver") || "");
    testResponse.answers = answers;
    const questionIds = [];
    console.log(questions);
    for (const question of questions) {
      questionIds.push(question.id);
    }
    testResponse.questions = questionIds;

    let maxPoints = 0;
    for (const question of questions) {
      question.open = false;
      maxPoints += question.points;
    }
    testResponse.maxPoints = maxPoints;

    console.log("Timer over: ", timerOver);
    console.log(answers);
    if (!timerOver) {
      for (const answer of answers) {
        if (answer.required && answer.userAnswers.length === 0) {
          testStore.setAlertBox(
            true,
            "error",
            "You must answer all the required questions "
          );
          return;
        }
      }
    }
    await testStore.submitTest(testId, testResponse, answers);
  };

  function setTextOptionAnswer(ans: string, qno: number, type: string) {
    if (type === "text") {
      const responseAnswersText = [...answers];
      responseAnswersText[qno].userAnswers = [];
      responseAnswersText[qno].userAnswers.push(ans);
      responseAnswersText[qno].question = questions[qno].id;
      responseAnswersText[qno].questionPoints = questions[qno].points;
      setAnswers(responseAnswersText);
    }
  }

  function setOptionAnswer(ans: string, qno: number, type: string) {
    switch (type) {
      case "radio":
        removeAnswer(qno);
        const responseAnswersRadio = [...answers];
        if (
          !responseAnswersRadio[qno].userAnswers.includes(ans) &&
          responseAnswersRadio[qno].userAnswers.length === 0
        ) {
          responseAnswersRadio[qno].userAnswers.push(ans);
          responseAnswersRadio[qno].question = questions[qno].id;
          responseAnswersRadio[qno].questionPoints = questions[qno].points;
          responseAnswersRadio[qno].correctAnswers =
            questions[qno].correctAnswer;
          setAnswers(responseAnswersRadio);
        }
        break;
      case "checkbox":
        const responseAnswersCheckbox = [...answers];
        if (responseAnswersCheckbox[qno].userAnswers.includes(ans)) {
          responseAnswersCheckbox[qno].userAnswers.splice(
            responseAnswersCheckbox[qno].userAnswers.indexOf(ans),
            1
          );
          setAnswers(responseAnswersCheckbox);
        } else {
          if (
            !responseAnswersCheckbox[qno].userAnswers.includes(ans) &&
            responseAnswersCheckbox[qno].userAnswers.length <=
              questions[qno].options.length
          ) {
            responseAnswersCheckbox[qno].userAnswers.push(ans);
            responseAnswersCheckbox[qno].question = questions[qno].id;
            responseAnswersCheckbox[qno].questionPoints = questions[qno].points;
            responseAnswersCheckbox[qno].correctAnswers =
              questions[qno].correctAnswer;
            setAnswers(responseAnswersCheckbox);
          }
        }
        break;
    }
  }

  function removeAnswer(qno: any) {
    const responseAnswers = [...answers];
    responseAnswers[qno].userAnswers = [];
    setAnswers(responseAnswers);
  }

  function questionsUI() {
    return questions.map((ques: any, i: number) => (
      <Box key={i}>
        <Box>
          <Box sx={{ marginBottom: "2rem" }}>
            <Box
              sx={{
                borderRadius: "8px",
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
                <Chip
                  size="small"
                  sx={{ width: "100px", float: "right", m: 2 }}
                  label={ques.required ? "Required" : "Not required"}
                />
                <Box
                  sx={{ backgroundColor: `${color} !important` }}
                  className="saved_questions"
                >
                  <Typography
                    sx={{
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
                      <Box>
                        <Box sx={{ display: "flex" }}>
                          <Box>
                            {ques.questionType != "radio" ? (
                              ques.questionType != "text" ? (
                                <label
                                  className="fontLabel"
                                  style={{
                                    fontFamily: `"Roboto","Helvetica","Arial",sans-serif}`,
                                    backgroundColor: `${color} !important`,
                                  }}
                                >
                                  <input
                                    onClick={() => {
                                      setOptionAnswer(
                                        ques.options[j],
                                        i,
                                        ques.questionType
                                      );
                                    }}
                                    type={ques.questionType}
                                    required={ques.required}
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
                                <label
                                  style={{
                                    fontSize: "13px",
                                    backgroundColor: `${color} !important`,
                                  }}
                                  // onClick={() => {
                                  //   setOptionAnswer(
                                  //       ques.options[j],
                                  //       i,
                                  //       ques.questionType
                                  //   );
                                  // }}
                                >
                                  <Input
                                    onChange={(e) => {
                                      setTextOptionAnswer(
                                        e.target.value,
                                        i,
                                        ques.questionType
                                      );
                                    }}
                                    type={ques.questionType}
                                    required={ques.required}
                                    style={{
                                      backgroundColor: `${color} !important`,
                                      marginRight: "10px",
                                      marginBottom: "10px",
                                      marginTop: "5px",
                                      width: "500px"
                                    }}
                                  />
                                </label>
                              )
                            ) : (
                              <label
                                className="fontLabel"
                                style={{
                                  fontFamily: `"Roboto","Helvetica","Arial",sans-serif}`,
                                  backgroundColor: `${color} !important`,
                                }}
                              >
                                <input
                                  onClick={() => {
                                    setOptionAnswer(
                                      ques.options[j],
                                      i,
                                      ques.questionType
                                    );
                                  }}
                                  name={ques.id}
                                  type={ques.questionType}
                                  required={ques.required}
                                  style={{
                                    backgroundColor: `${color} !important`,
                                    marginRight: "10px",
                                    marginBottom: "10px",
                                    marginTop: "5px",
                                  }}
                                />
                                {ques.options[j]}
                              </label>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              {ques.note && (
                <Box className="centered">
                  <TextField
                    sx={{ width: "85%", mt: 1, mb: 2 }}
                    fullWidth
                    id="multiline"
                    label="Note"
                    multiline
                    disabled
                    rows={2}
                    value={ques.note}
                    variant="outlined"
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    ));
  }

  return (
    <Box>
      {time > 0 && (
        <Box>
          <MyTimer
            onExpire={handleResponse}
            type={type}
            expiryTimestamp={timer}
            testTime={time}
          />
        </Box>
      )}
      <Box>{questionsUI()}</Box>

      <Box className="save_form">
        <Button
          disabled={type}
          className="darkButton"
          onClick={handleResponse}
          sx={{ fontSize: "14px", border: "1px solid black" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default observer(ResponseQuestions);
