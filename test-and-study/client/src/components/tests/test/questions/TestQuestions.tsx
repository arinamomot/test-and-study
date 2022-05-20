import IconButton from "@mui/material/IconButton";
import { observer } from "mobx-react-lite";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import CloseIcon from "@material-ui/icons/Close";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SubjectIcon from "@material-ui/icons/Subject";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import { FcRightUp } from "react-icons/fc";
import { IQuestion } from "../../../../models/IQuestion";
import { ITopic } from "../../../../models/ITopic";
import { Context } from "../../../../pages/_app";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  Input,
  Radio,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";

interface QuestionProps {
  testId: string;
  questionsFromProps: IQuestion[];
  subTopic?: string;
  color?: string | null;
  onSave: Function;
  testType: string;
}

const TestQuestions = ({
  testId,
  questionsFromProps,
  color,
  onSave,
  subTopic,
  testType,
}: QuestionProps) => {
  const { testStore } = useContext(Context);
  const [questions, setQuestions] = useState<IQuestion[]>(questionsFromProps);
  const [topics, setTopics] = useState<ITopic[]>(
    testStore.getQuestionsTopics()
  );

  const [questionsToDelete, setQuestionsToDelete] = useState<string[]>([]);
  const [questionType, setType] = useState<string>("radio");
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);
  const [questionRequired, setRequired] = useState("true");

  useEffect(() => {
    if (localStorage.getItem("changedQuestions"))
      setQuestions(JSON.parse(localStorage.getItem("changedQuestions") || ""));
    for (const question of questions) {
      question.open = false;
    }
  }, []);

  function changeType(e: any) {
    setType(e.target.id);
  }

  useEffect(() => {
    setType(questionType);
  }, [changeType]);

  const handleUpdate = () => {
    onSave(questions, questionsToDelete);
  };

  const [added, setAdded] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  function handleAddNewQuestion() {
    localStorage.setItem("change", JSON.stringify(true));
    expandCloseAll();

    setQuestions((questions: any) => [
      ...questions,
      {
        test: testId,
        questionText: "Question",
        questionType: "radio",
        note: "",
        options: ["Option 1"],
        points: 0,
        topic: subTopic,
        correctAnswer: [],
        required: true,
        open: true,
      },
    ]);
    if (localStorage.getItem("previewBack"))
      localStorage.removeItem("previewBack");
    setAdded((prevState) => !prevState);
  }

  useEffect(() => {
    localStorage.setItem("changedQuestions", JSON.stringify(questions));
  }, [added, deleted, copied]);

  function addQuestionType(i: number, type: string) {
    let qs = [...questions];
    qs[i].questionType = type;
    qs[i].options = [""];
    setQuestions(qs);
    setAdded((prevState) => !prevState);
  }

  function copyQuestion(i: number) {
    expandCloseAll();
    let qs = [...questions];
    const newQuestion = JSON.parse(JSON.stringify(qs[i]));

    setQuestions([...questions, newQuestion]);
    setCopied((prevState) => !prevState);
  }

  function deleteQuestion(i: number) {
    let qs = [...questions];
    let deleteqs = [...questionsToDelete];
    if (qs[i].id) {
      deleteqs.push(qs[i].id);
      setQuestionsToDelete(deleteqs);
    }
    if (questions.length > 0) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
    setDeleted((prevState) => !prevState);
  }

  function handleOptionValue(text: string, i: number, j: number) {
    const optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j] = text;
    setQuestions(optionsOfQuestion);
    setAdded((prevState) => !prevState);
  }

  function handleFeedbackButton(i: number) {
    const answerFeedbackQues = [...questions];
    if (showAnswerFeedback) {
      answerFeedbackQues[i].answerFeedback = "";
      setQuestions(answerFeedbackQues);
      setShowAnswerFeedback(false);
    } else {
      setShowAnswerFeedback(true);
    }
  }

  function handleAnswerFeedBack(text: string, i: number) {
    const answerFeedbackQues = [...questions];
    answerFeedbackQues[i].answerFeedback = text;
    setQuestions(answerFeedbackQues);
    setAdded((prevState) => !prevState);
  }

  function handleQuestionValue(text: string, i: number) {
    const optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
    setQuestions(optionsOfQuestion);
    setAdded((prevState) => !prevState);
  }

  function handleQuestionNote(text: string, i: number) {
    const optionsOfQuestion = [...questions];
    optionsOfQuestion[i].note = text;
    setQuestions(optionsOfQuestion);
    setAdded((prevState) => !prevState);
  }

  function handleQuestionTopic(text: string, i: number) {
    const optionsOfQuestion = [...questions];
    optionsOfQuestion[i].topic = text;
    setQuestions(optionsOfQuestion);
    setAdded((prevState) => !prevState);
  }

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function onDragEnd(result: {
    destination: { index: number };
    source: { index: number };
  }) {
    if (!result.destination) {
      return;
    }
    const itemgg = [...questions];
    const itemF: any = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF);
  }

  function addOption(i: number) {
    const optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push(
        "Option " + (optionsOfQuestion[i].options.length + 1)
      );
    }
    setQuestions(optionsOfQuestion);
    setAdded((prevState) => !prevState);
  }

  function setOptionAnswer(ans: string, qno: number, type: string) {
    switch (type) {
      case "radio":
        removeAnswer(qno);
        const questionsAnswersRadio = [...questions];
        if (
          !questionsAnswersRadio[qno].correctAnswer.includes(ans) &&
          questionsAnswersRadio[qno].correctAnswer.length === 0
        ) {
          questionsAnswersRadio[qno].correctAnswer.push(ans);
          setQuestions(questionsAnswersRadio);
          setAdded((prevState) => !prevState);
        }
        break;
      case "checkbox":
        const questionsAnswersCheckbox = [...questions];
        if (questionsAnswersCheckbox[qno].correctAnswer.includes(ans)) {
          questionsAnswersCheckbox[qno].correctAnswer.splice(
            questionsAnswersCheckbox[qno].correctAnswer.indexOf(ans),
            1
          );
          setQuestions(questionsAnswersCheckbox);
          setAdded((prevState) => !prevState);
        } else {
          if (
            !questionsAnswersCheckbox[qno].correctAnswer.includes(ans) &&
            questionsAnswersCheckbox[qno].correctAnswer.length <=
              questionsAnswersCheckbox[qno].options.length
          ) {
            questionsAnswersCheckbox[qno].correctAnswer.push(ans);
            setQuestions(questionsAnswersCheckbox);
            setAdded((prevState) => !prevState);
          }
        }
        break;
      case "text":
        const questionsAnswersText = [...questions];
        if (questionsAnswersText[qno].correctAnswer.includes(ans)) {
          questionsAnswersText[qno].correctAnswer.splice(
            questionsAnswersText[qno].correctAnswer.indexOf(ans),
            1
          );
          setQuestions(questionsAnswersText);
          setAdded((prevState) => !prevState);
        } else {
          if (
            !questionsAnswersText[qno].correctAnswer.includes(ans) &&
            questionsAnswersText[qno].correctAnswer.length <=
              questionsAnswersText[qno].options.length
          ) {
            questionsAnswersText[qno].correctAnswer.push(ans);
            setQuestions(questionsAnswersText);
            setAdded((prevState) => !prevState);
          }
        }
        break;
    }
  }

  function removeAnswer(qno: any) {
    const questionsAnswers = [...questions];
    questionsAnswers[qno].correctAnswer = [];
    setQuestions(questionsAnswers);
    setAdded((prevState) => !prevState);
  }

  function setQuestionPoints(points: any, qno: any) {
    const questionsPoints = [...questions];

    questionsPoints[qno].points = points;

    setQuestions(questionsPoints);
    setAdded((prevState) => !prevState);
  }

  function addAnswer(i: number) {
    const answerOfQuestion = [...questions];

    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;

    setQuestions(answerOfQuestion);
    setAdded((prevState) => !prevState);
  }

  function doneAnswer(i: number) {
    const answerOfQuestion = [...questions];

    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;

    setQuestions(answerOfQuestion);
    setAdded((prevState) => !prevState);
  }

  function requiredQuestion(i: number) {
    const requiredQuestion = [...questions];

    requiredQuestion[i].required = !requiredQuestion[i].required;

    setQuestions(requiredQuestion);
    setAdded((prevState) => !prevState);
  }

  function removeOption(i: number, j: number) {
    const optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length > 1) {
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion);
      setAdded((prevState) => !prevState);
    }
  }

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
      qs[j].answer = false;
    }
    setQuestions(qs);
    setAdded((prevState) => !prevState);
  }

  function handleExpand(i: number) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = !qs[i].open;
      }
    }
    setQuestions(qs);
    setAdded((prevState) => !prevState);
  }

  // useEffect(() => {
  //   setQuestions([...questions]);
  // }, [expanded])

  function questionsUI() {
    return questions.map((ques: any, i: number) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided: any, snapshot: any) => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Box>
              <Box sx={{ marginBottom: "0px" }}>
                <Box sx={{ width: "100%", marginBottom: "0px" }}>
                  <DragIndicatorIcon
                    style={{
                      marginTop: "10px",
                      transform: "rotate(-90deg)",
                      color: "#DAE0E2",
                      position: "relative",
                      left: "300px",
                    }}
                    fontSize="small"
                  />
                </Box>

                <Accordion
                  // expanded={expanded === "panel1"}
                  // onChange={handleChange("panel1")}
                  onChange={() => {
                    handleExpand(i);
                  }}
                  expanded={questions[i].open || false}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: `${color} !important`,
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      backgroundColor: `${color} !important`,
                      width: "100%",
                      borderRadius: "8px",
                    }}
                  >
                    {!questions[i].open ? (
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
                          <Box key={j}>
                            <Box sx={{ display: "flex" }}>
                              <FormControlLabel
                                sx={{
                                  marginLeft: "5px",
                                  marginBottom: "5px",
                                }}
                                disabled
                                control={
                                  ques.questionType !== "text" ? (
                                    <input
                                      type={ques.questionType}
                                      color="primary"
                                      checked={ques.correctAnswer.includes(
                                        ques.options[j]
                                      )}
                                      style={{ marginRight: "3px" }}
                                      required={ques.questionType}
                                    />
                                  ) : (
                                    <Typography fontSize="13px" mr={0.5} />
                                  )
                                }
                                label={
                                  ques.questionType !== "text" ? (
                                    <Typography
                                      sx={{
                                        backgroundColor: `${color} !important`,
                                        fontSize: " 13px",
                                        fontWeight: "400",
                                        letterSpacing: ".2px",
                                        lineHeight: "20px",
                                        color: "#202124",
                                      }}
                                    >
                                      {ques.options[j]}
                                    </Typography>
                                  ) : (
                                    <input
                                      disabled
                                      style={{
                                        backgroundColor: `${color} !important`,
                                      }}
                                      type="text"
                                    />
                                  )
                                }
                              />
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      ""
                    )}
                  </AccordionSummary>
                  <Box
                    sx={{ backgroundColor: `${color} !important` }}
                    className="question_boxes"
                  >
                    {!ques.answer ? (
                      <AccordionDetails
                        sx={{ backgroundColor: `${color} !important` }}
                        className="add_question"
                      >
                        <Box>
                          <Box
                            sx={{ backgroundColor: `${color} !important` }}
                            className="add_question_top"
                          >
                            {i + 1}.
                            <Input
                              sx={{ backgroundColor: `${color} !important` }}
                              type="text"
                              className="question"
                              placeholder="TestQuestions"
                              value={ques.questionText}
                              onChange={(e) => {
                                handleQuestionValue(e.target.value, i);
                              }}
                            />
                            <Select
                              defaultValue={ques.questionType || ""}
                              className="select"
                              sx={{ color: "#5f6368", fontSize: "13px" }}
                            >
                              <MenuItem
                                id="text"
                                value="text"
                                onClick={() => {
                                  addQuestionType(i, "text");
                                }}
                              >
                                {" "}
                                <SubjectIcon
                                  style={{
                                    fontSize: "1.2rem",
                                    marginRight: "10px",
                                    color: "#70757a",
                                    pointerEvents: "none",
                                  }}
                                />{" "}
                                Text
                              </MenuItem>
                              <MenuItem
                                id="checkbox"
                                value="checkbox"
                                onClick={() => {
                                  addQuestionType(i, "checkbox");
                                }}
                              >
                                <CheckBoxIcon
                                  style={{
                                    fontSize: "1.2rem",
                                    marginRight: "10px",
                                    color: "#70757a",
                                    pointerEvents: "none",
                                  }}
                                />{" "}
                                Multiple Choice
                              </MenuItem>
                              <MenuItem
                                id="radio"
                                value="radio"
                                onClick={() => {
                                  addQuestionType(i, "radio");
                                }}
                              >
                                {" "}
                                <Radio
                                  style={{
                                    padding: 0,
                                    fontSize: "1.2rem",
                                    marginRight: "10px",
                                    marginBottom: "5px",
                                    color: "#70757a",
                                    pointerEvents: "none",
                                  }}
                                  checked
                                />{" "}
                                Single Choice
                              </MenuItem>
                            </Select>
                          </Box>

                          {ques.options.map((op: any, j: any) => (
                            <Box
                              sx={{ backgroundColor: `${color} !important` }}
                              className="add_question_body"
                              key={j}
                            >
                              {ques.questionType != "text" ? (
                                <input
                                  disabled
                                  checked={ques.correctAnswer.includes(
                                    ques.options[j]
                                  )}
                                  type={ques.questionType}
                                  style={{
                                    marginRight: "10px",
                                    backgroundColor: `${color} !important`,
                                  }}
                                />
                              ) : (
                                <SubjectIcon style={{ marginRight: "10px" }} />
                              )}
                              <Box>
                                <Input
                                  sx={{
                                    backgroundColor: `${color} !important`,
                                  }}
                                  type="text"
                                  className="text_input"
                                  placeholder="Option"
                                  value={ques.options[j]}
                                  onChange={(e) => {
                                    handleOptionValue(e.target.value, i, j);
                                  }}
                                />
                              </Box>
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  removeOption(i, j);
                                }}
                              >
                                <Tooltip title="Remove option">
                                  <CloseIcon />
                                </Tooltip>
                              </IconButton>
                            </Box>
                          ))}

                          {ques.options.length < 5 ? (
                            <Box sx={{ ml: 1 }}>
                              <Button
                                disabled={ques.questionType === "text"}
                                onClick={() => {
                                  addOption(i);
                                }}
                                sx={{
                                  textTransform: "none",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                }}
                              >
                                Add Option
                              </Button>
                            </Box>
                          ) : (
                            ""
                          )}
                          <Box className="add_footer">
                            <Box className="add_question_bottom_left">
                              <Tooltip title="Add answer">
                                <Button
                                  size="small"
                                  onClick={() => {
                                    addAnswer(i);
                                  }}
                                  sx={{
                                    textTransform: "none",
                                    color: "#4285f4",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                >
                                  {" "}
                                  <FcRightUp
                                    style={{
                                      border: "2px solid #4285f4",
                                      padding: "2px",
                                      marginRight: "8px",
                                    }}
                                  />{" "}
                                  Answer key
                                </Button>
                              </Tooltip>
                            </Box>

                            <Box
                              sx={{ backgroundColor: `${color} !important` }}
                              className="add_question_bottom"
                            >
                              <IconButton
                                size="small"
                                onClick={() => {
                                  copyQuestion(i);
                                }}
                              >
                                <Tooltip title="Copy question">
                                  <FilterNoneIcon />
                                </Tooltip>
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => {
                                  deleteQuestion(i);
                                }}
                              >
                                <Tooltip title="Delete question">
                                  <DeleteIcon sx={{ ml: "0.5rem" }} />
                                </Tooltip>
                              </IconButton>
                              <FormControlLabel
                                sx={{ ml: "0.5rem" }}
                                control={
                                  <Switch
                                    size="small"
                                    checked={ques.required}
                                    value={ques.required}
                                    onChange={() => {
                                      requiredQuestion(i);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="Required"
                              />
                            </Box>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    ) : (
                      <AccordionDetails className="add_question">
                        <Box className="top_header">Choose Correct Answer</Box>
                        <Box>
                          <Box className="add_question_top">
                            <Input
                              sx={{ backgroundColor: `${color} !important` }}
                              type="text"
                              className="question "
                              placeholder="TestQuestions"
                              value={ques.questionText}
                              disabled
                            />
                            <Tooltip title="min: 0, max: 5">
                              <Typography sx={{ mr: 1 }}>Points: </Typography>
                            </Tooltip>
                            <input
                              disabled={testType === "NONSCORED"}
                              type="number"
                              className="points"
                              value={ques.points}
                              min="0"
                              max="5"
                              step="1"
                              placeholder="0"
                              onChange={(e) => {
                                setQuestionPoints(e.target.value, i);
                              }}
                            />
                          </Box>

                          {ques.options.map((op: any, j: any) => (
                            <Box
                              className="add_question_body"
                              key={j}
                              sx={{
                                marginLeft: "8px",
                                marginBottom: "10px",
                                marginTop: "5px",
                                backgroundColor: `${color} !important`,
                              }}
                            >
                              <Box key={j}>
                                <Box sx={{ display: "flex" }} className="">
                                  <Box className="form-check">
                                    {ques.questionType != "text" ? (
                                      <label
                                        style={{
                                          fontSize: "13px",
                                          backgroundColor: `${color} !important`,
                                        }}
                                        onClick={() => {
                                          setOptionAnswer(
                                            ques.options[j],
                                            i,
                                            ques.questionType
                                          );
                                        }}
                                      >
                                        <input
                                          type={ques.questionType}
                                          name={ques.questionText}
                                          checked={ques.correctAnswer.includes(
                                            ques.options[j]
                                          )}
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
                                        <SubjectIcon
                                          style={{ marginRight: "10px" }}
                                        />
                                        <Input
                                          type={ques.questionType}
                                          name={ques.questionText}
                                          required={ques.required}
                                          disabled
                                          style={{
                                            backgroundColor: `${color} !important`,
                                            marginRight: "10px",
                                            marginBottom: "10px",
                                            marginTop: "5px",
                                          }}
                                        />
                                      </label>
                                    )}
                                    {/*</label>*/}
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          ))}

                          <Box className="add_question_body">
                            <Button
                              size="small"
                              sx={{
                                textTransform: "none",
                                color: "#4285f4",
                                fontSize: "13px",
                                fontWeight: "600",
                              }}
                              onClick={() => handleFeedbackButton(i)}
                            >
                              {showAnswerFeedback ? (
                                <>
                                  <DeleteIcon
                                    style={{
                                      fontSize: "20px",
                                      marginRight: "8px",
                                    }}
                                  />
                                  Delete Answer Feedback
                                </>
                              ) : (
                                <>
                                  <PostAddIcon
                                    style={{
                                      fontSize: "20px",
                                      marginRight: "8px",
                                    }}
                                  />
                                  Add Answer Feedback
                                </>
                              )}
                            </Button>
                            <br />
                            <br />
                            {showAnswerFeedback && (
                              <TextField
                                size="small"
                                placeholder="Answer feedback"
                                value={ques.answerFeedback}
                                onChange={(e) => {
                                  handleAnswerFeedBack(e.target.value, i);
                                }}
                                sx={{
                                  backgroundColor: `${color} !important`,
                                  width: "85%",
                                  mt: 1,
                                  mb: 2,
                                }}
                                fullWidth
                                id="multiline"
                                label="Answer feedback"
                                multiline
                                variant="outlined"
                              />
                            )}
                          </Box>

                          <Box className="add_question_bottom">
                            <Button
                              className="redButton"
                              disabled={ques.questionType === "text"}
                              sx={{
                                textTransform: "none",
                                color: "#4285f4",
                                fontSize: "12px",
                                marginTop: "12px",
                                fontWeight: "600",
                                marginRight: "5px",
                              }}
                              onClick={() => {
                                removeAnswer(i);
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              className="darkButton"
                              color="primary"
                              sx={{
                                textTransform: "none",
                                color: "#4285f4",
                                fontSize: "12px",
                                marginTop: "12px",
                                fontWeight: "600",
                              }}
                              onClick={() => {
                                doneAnswer(i);
                              }}
                            >
                              Done
                            </Button>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    )}
                  </Box>
                  <Box>
                    <TextField
                      sx={{ width: "30%", ml: 6, mb: 1 }}
                      fullWidth
                      size="small"
                      label="Topic"
                      value={ques.topic}
                      onChange={(e) => {
                        handleQuestionTopic(e.target.value, i);
                      }}
                      variant="outlined"
                    />
                  </Box>
                  <Box className="centered">
                    <TextField
                      sx={{ width: "85%", mt: 1, mb: 2 }}
                      fullWidth
                      id="multiline"
                      label="Note"
                      multiline
                      rows={2}
                      value={ques.note}
                      onChange={(e) => {
                        handleQuestionNote(e.target.value, i);
                      }}
                      variant="outlined"
                    />
                  </Box>
                </Accordion>
              </Box>
            </Box>
          </Box>
        )}
      </Draggable>
    ));
  }

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: any, snapshot: any) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {questionsUI()}

              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      <Box className="centered">
        <IconButton onClick={handleAddNewQuestion} sx={{ mt: 2 }}>
          <Tooltip title="Add new question">
            <AddCircleIcon fontSize="large" />
          </Tooltip>
        </IconButton>
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <Button
          onClick={() => window.print()}
          className="darkButton"
          sx={{ mr: 2, border: "1px solid black" }}
        >
          Save as PDF
        </Button>
        <Button
          className="darkButton"
          onClick={handleUpdate}
          sx={{ fontSize: "14px", border: "1px solid black" }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default observer(TestQuestions);
