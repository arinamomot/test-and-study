import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useState } from "react";
import { IQuestion } from "../../../models/IQuestion";
import { ITest } from "../../../models/ITest";
import { ITestType } from "../../../models/ITestType";
import { ITopic } from "../../../models/ITopic";
import { Context } from "../../../pages/_app";
import AlertComp from "../../AlertComp";
import BackButton from "../../BackButton";
import ResponseQuestions from "../response/questions/ResponseQuestions";
import RespQuesAfterSubmit from "../response/questions/RespQuesAfterSubmit";

interface ResponseViewProps {
  onChange?: Function;
}

const ResponseView = ({ onChange }: ResponseViewProps) => {
  let { testStore } = useContext(Context);

  let test = {} as ITest;
  let topic = {} as ITopic;
  let questionsLocalStorage: IQuestion[] = [];
  let questionsTopicsLocalStorage: ITopic[] = [];
  let testTypesLocalStorage: ITestType[] = [];
  let type: boolean = false;
  let run: boolean = false;
  if (typeof window !== "undefined") {
    if (localStorage.getItem("test"))
      test = JSON.parse(localStorage.getItem("test") || "");
    if (localStorage.getItem("topic"))
      topic = JSON.parse(localStorage.getItem("testTopic") || "");
    // questionsTopicsLocalStorage = JSON.parse(
    //   localStorage.getItem("topics") || ""
    // );
    if (localStorage.getItem("testTypes"))
      testTypesLocalStorage = JSON.parse(
        localStorage.getItem("testTypes") || ""
      );
    if (localStorage.getItem("preview"))
      type = JSON.parse(localStorage.getItem("preview") || "");
    if (localStorage.getItem("run"))
      run = JSON.parse(localStorage.getItem("run") || "");
    if (type && localStorage.getItem("changedQuestions"))
      questionsLocalStorage = JSON.parse(
        localStorage.getItem("changedQuestions") || ""
      );
    else if (localStorage.getItem("questions"))
      questionsLocalStorage = JSON.parse(
        localStorage.getItem("questions") || ""
      );
  }

  const defaultColor = "#F4F4F9";
  const [color, setColor] = useState<string | undefined | null>(
    test.color || defaultColor
  );
  const colors = ["default", "beige", "pink", "green", "blue"];

  const [title, setTitle] = useState<string>(test.title);
  const [description, setDescription] = useState<string>(test.description);
  const [topicTitle, setTestTopic] = useState<string>(topic.title);
  const [subTopic, setTestSubTopic] = useState<string>(topic.subTopic);
  const [testType, setTestType] = useState<string>(test.testType);
  const [testTypes, setTestTypes] = useState<ITestType[]>(
    testTypesLocalStorage
  );
  const [questionsTopics, setTQuestionsTopics] = useState<ITopic[]>(
    questionsTopicsLocalStorage
  );
  const [questions, setQuestions] = useState<IQuestion[]>(
    questionsLocalStorage
  );
  const [time, setTime] = useState<number>(test.time || 0);

  // const timer = new Date();
  // timer.setSeconds(timer.getSeconds() + time * 60);

  const handleBack = () => {
    if (localStorage.getItem("preview")) {
      localStorage.setItem("previewBack", JSON.stringify(true));
      localStorage.removeItem("preview");
      // localStorage.setItem("changedQuestions", JSON.stringify(localStorage.getItem("changedQuestions") || ""));
      // await testStore.setQues(JSON.parse(localStorage.getItem("changedQuestions") || ''))
    }
    if (localStorage.getItem("run")) localStorage.removeItem("run");
  };

  return (
    <>
      {testStore.alertBox.show && (
        <AlertComp
          type={testStore.alertBox.type}
          message={testStore.alertBox.message}
        />
      )}
      {typeof window !== "undefined" &&
        localStorage.getItem("points") === null && (
          <Box sx={{ marginTop: "2rem", marginLeft: "2rem" }}>
            {run ? (
              <BackButton
                pageName={"main"}
                className={"backButtonTestView"}
                href={"/main"}
              />
            ) : (
              <Button
                href={`/test/${test._id}`}
                className="backButtonTestView"
                variant="outlined"
                sx={{ m: "1rem" }}
                onClick={handleBack}
              >
                <ArrowBackIcon sx={{ mr: "0.5rem" }} fontSize="small" />
                Back to test creation
              </Button>
            )}
          </Box>
        )}

      <Box
        sx={{
          backgroundColor: "background.paper",
          width: "100%",
          mt: "3rem",
          mb: "2rem",
        }}
      >
        <Box
          sx={{ backgroundColor: `${color} !important` }}
          className="testSection"
        >
          <Box className="test">
            {typeof window !== "undefined" &&
              localStorage.getItem("points") === null && (
                <Box
                  className="TestInfo"
                  sx={{ backgroundColor: `${color} !important` }}
                >
                  <Typography variant="h4">{title}</Typography>
                  <br />
                  <Typography variant="body1">
                    Description: {description}
                  </Typography>
                  <br />
                  {topicTitle !== "undefined" && (
                    <>
                      <Typography variant="body1">
                        Topic: {topicTitle}
                      </Typography>
                      <br />
                    </>
                  )}
                  {subTopic !== "undefined" && (
                    <>
                      <Typography variant="body1">
                        Sub-topic: {subTopic}
                      </Typography>
                      <br />
                    </>
                  )}
                  <Typography variant="body1">Type: {testType}</Typography>
                  <br />
                  <Typography variant="body1">
                    Time: {time ? `${time} min` : "Unlimited"}
                  </Typography>
                </Box>
              )}
            {typeof window !== "undefined" &&
            localStorage.getItem("points") === null ? (
              <Box className="user_form_questions">
                <ResponseQuestions
                  time={time}
                  type={type}
                  color={color}
                  testId={test._id}
                  questionsFromProps={questions}
                  topicsFromProps={questionsTopics}
                />
              </Box>
            ) : (
              <Box className="user_form_questions">
                <RespQuesAfterSubmit
                  onChange={onChange}
                  test={test}
                  type={type}
                  color={color}
                  testId={test._id}
                  questionsFromProps={questions}
                  topicsFromProps={questionsTopics}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default observer(ResponseView);
