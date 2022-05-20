import { PhotoCamera } from "@material-ui/icons";
import CloseIcon from "@mui/icons-material/Close";
import PaletteIcon from "@mui/icons-material/Palette";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  InputLabel,
  Menu,
  Select,
  Switch,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { observer } from "mobx-react-lite";
import Router from "next/router";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { IQuestion } from "../../../models/IQuestion";
import { IResponse } from "../../../models/IResponse";
import { ITest } from "../../../models/ITest";
import { ITestType } from "../../../models/ITestType";
import { ITopic } from "../../../models/ITopic";
import { IUser } from "../../../models/IUser";
import { Context } from "../../../pages/_app";
import AlertComp from "../../AlertComp";
import BackButton from "../../BackButton";
import MembersPanel from "../MembersPanel";
import ResponsesPanel from "../ResponsesPanel";
import TestQuestions from "./questions/TestQuestions";
import ShareDialog from "./ShareDialog";

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const TestView = () => {
  let { testStore } = useContext(Context);

  let test = {} as ITest;
  let topic = {} as ITopic;
  let questionsLocalStorage: IQuestion[] = [];
  let testTypesLocalStorage: ITestType[] = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("test"))
      test = JSON.parse(localStorage.getItem("test") || "");
    if (localStorage.getItem("testTopic"))
      topic = JSON.parse(localStorage.getItem("testTopic") || "");
    if (localStorage.getItem("questions"))
      questionsLocalStorage = JSON.parse(
        localStorage.getItem("questions") || ""
      );
    if (localStorage.getItem("previewBack")) {
      questionsLocalStorage = JSON.parse(
        localStorage.getItem("changedQuestions") || ""
      );
    }
    if (localStorage.getItem("testTypes"))
      testTypesLocalStorage = JSON.parse(
        localStorage.getItem("testTypes") || ""
      );
  }

  const defaultColor = "#F4F4F9";
  const [color, setColor] = useState<string | undefined | null>(
    test.color || defaultColor
  );
  const colors = ["default", "beige", "pink", "green", "blue"];

  const [title, setTitle] = useState<string>(test.title);
  const [description, setDescription] = useState<string>(test.description);
  const [topicTitle, setTestTopic] = useState<string | undefined | null>(
    topic.title || ""
  );
  const [subTopic, setTestSubTopic] = useState<string>(topic.subTopic || "");
  const [testType, setTestType] = useState<string>(test.testType);
  const [testTypes, setTestTypes] = useState<ITestType[]>(
    testTypesLocalStorage
  );
  const [questions, setQuestions] = useState<IQuestion[]>(
    questionsLocalStorage
  );
  const [time, setTime] = useState<number>(test.time || 0);
  const [useTime, setUseTime] = useState<boolean>(Boolean(test.time));
  const [evaluation, setEvaluation] = useState<boolean>(
    Boolean(test.evaluation)
  );

  const [file, setFile] = useState<Blob>();
  const [preview, setPreview] = useState<string>();
  const [testPhoto, setTestPhoto] = useState<string>(test.image || "");

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handlePhoto = async () => {
    if (file !== undefined) {
      let data = new FormData();
      data.append("file", file);
      data.append("test", test._id);
      const resp = await testStore.uploadTestPhoto(data);
      setFile(undefined);
      if (resp) {
        setTestPhoto(resp);
      }
    }
  };

  const handleDeleteTestPhoto = async () => {
    const resp = await testStore.deleteTestPhoto(testPhoto, test._id);
    setTestPhoto("");
  };

  const [value, setValue] = useState<number>(0);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [dialogOpen, setDialog] = useState<boolean>(false);

  const handleOpenColor = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseColor = () => {
    setAnchorElUser(null);
  };

  const handleColor = (color: string) => {
    switch (color) {
      case "default":
        setColor(defaultColor);
        localStorage.setItem("color", defaultColor);
        break;
      case "blue":
        setColor("lightSkyBlue");
        localStorage.setItem("color", "lightSkyBlue");
        break;
      case "green":
        setColor("lightGreen");
        localStorage.setItem("color", "lightGreen");
        break;
      case "beige":
        setColor("papayaWhip");
        localStorage.setItem("color", "papayaWhip");
        break;
      default:
        setColor(color);
        localStorage.setItem("color", color);
        break;
    }
    handleCloseColor();
  };

  const [responses, setResponses] = useState<IResponse[]>([]);
  const [respUsers, setRespUsers] = useState<IUser[]>([]);
  const [members, setMembers] = useState<IUser[]>([]);

  const handleChange = async (event: any, newValue: number) => {
    setValue(newValue);
    if (newValue === 1) {
      const responsesTestStore = await testStore.getTestResponses(test._id);
      if (responsesTestStore)
        setResponses(responsesTestStore.data.responses.reverse());
      if (responsesTestStore?.data.users)
        setRespUsers(responsesTestStore.data.users.reverse());
    }
    if (newValue === 0) {
      const responseQuestions = await testStore.getAllQuestionsByTestId(
        test._id
      );
      if (responseQuestions)
        questionsLocalStorage = responseQuestions.data.questions;
    }
    if (newValue === 2) {
      const responseMembers = await testStore.getTestMembers(test._id);
      if (responseMembers) {
        setMembers(responseMembers.data.users);
      }
    }
  };

  const [updated, setUpdated] = useState<boolean>(false);

  const handleUpdate = async (
    questions: IQuestion[],
    questionsToDelete: string[]
  ) => {
    if (useTime && (time < 0 || time > 200)) {
      testStore.setAlertBox(
        true,
        "error",
        "Time must be in range of 1 - 200 min"
      );
      return;
    }
    test.title = title;
    test.description = description;
    test.time = time;
    test.topic = topicTitle + " " + subTopic;
    test.color = color ? color : defaultColor;
    test.members = [];
    test.testType = testType;
    test.questions = questions;
    test.evaluation = evaluation;
    localStorage.setItem("test", JSON.stringify(test));
    await testStore.updateTest(test, questionsToDelete);
    setUpdated(true);
    localStorage.removeItem("change");
  };

  useEffect(() => {
    if (localStorage.getItem("color")) setColor(localStorage.getItem("color"));
    setUseTime(Boolean(test.time));
  }, []);

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const handleShare = () => {
    setDialog((prevState) => !prevState);
  };

  return (
    <>
      {testStore.alertBox.show && (
        <AlertComp
          type={testStore.alertBox.type}
          message={testStore.alertBox.message}
        />
      )}
      <ShareDialog testId={test._id} open={dialogOpen} setOpen={setDialog} />
      <Box sx={{ marginTop: "2rem", marginLeft: "2rem" }}>
        <BackButton
          pageName={"main"}
          className={"backButtonTestView"}
          href={"/main"}
        />
      </Box>
      <Box sx={{ textAlign: "right", mr: 4 }}>
        <IconButton
          disabled={test?.questions?.length < 1}
          onClick={handleShare}
          sx={{ mr: "1rem" }}
        >
          <Tooltip title="Share test">
            <ShareOutlinedIcon />
          </Tooltip>
        </IconButton>
        <IconButton
          onClick={() => {
            localStorage.setItem("preview", JSON.stringify(true));
            localStorage.removeItem("previewBack");
            Router.push(`/response/${test._id}`);
          }}
          sx={{ mr: "1rem" }}
        >
          <Tooltip title="Test preview">
            <VisibilityIcon />
          </Tooltip>
        </IconButton>
        <IconButton
          disabled={test?.questions?.length < 1}
          onClick={() => {
            if (localStorage.getItem("change")) {
              testStore.setAlertBox(
                true,
                "error",
                "You must save your changes before starting the test"
              );
            } else {
              localStorage.setItem("preview", JSON.stringify(false));
              if (localStorage.getItem("previewBack"))
                localStorage.removeItem("previewBack");
              Router.push(`/response/${test._id}`);
            }
          }}
        >
          <Tooltip title="Run test">
            <PlayCircleFilledIcon />
          </Tooltip>
        </IconButton>
      </Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          mt: "1rem",
          mb: "2rem",
        }}
      >
        <Tabs
          sx={{ width: "100%" }}
          variant="fullWidth"
          centered
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          aria-label="full width tabs example"
        >
          <Tab label="Questions" {...a11yProps(0)} />
          <Tab label="Responses" {...a11yProps(1)} />
          <Tab label="Members" {...a11yProps(2)} />
        </Tabs>
        <Box sx={{ bgcolor: `${color} !important` }} className="testSection">
          <TabPanel value={value} index={0}>
            <Box className="test">
              <Box
                sx={{
                  width: "95%",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  display: "grid",
                  gridTemplateRows: "repeat(3)",
                }}
              >
                {testPhoto && (
                  <>
                    <Box>
                      <IconButton
                        sx={{ float: "right" }}
                        onClick={handleDeleteTestPhoto}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <img
                      height="200px"
                      width="100%"
                      style={{
                        marginTop: "10px",
                        borderRadius: "6px",
                      }}
                      src={`../uploads/${testPhoto}`}
                      alt={"test image"}
                    />
                  </>
                )}
                {file && (
                  <Box>
                    <Box>
                      <IconButton
                        sx={{ float: "right" }}
                        onClick={() => setFile(undefined)}
                      >
                        <CloseIcon />
                      </IconButton>
                      <img
                        height="200px"
                        width="100%"
                        style={{ maxHeight: "200px", borderRadius: "6px" }}
                        src={preview}
                        alt={"uploaded image"}
                      />
                    </Box>
                    <Box
                      sx={{
                        textAlign: "right !important",
                      }}
                    >
                      <Button
                        className="darkButton"
                        variant="outlined"
                        component="span"
                        onClick={handlePhoto}
                      >
                        Upload
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box className="TestInfo" sx={{ bgcolor: `${color} !important` }}>
                <Box sx={{ flexGrow: 0 }}>
                  <label
                    htmlFor="file"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                      fontFamily: "Roboto, Helvetica, Arial,sans-serif",
                    }}
                  >
                    <input
                      style={{ display: "none" }}
                      accept=".png, .jpg, .jpeg"
                      type="file"
                      id="file"
                      name="file"
                      onChange={(e) => setFile(e.target.files![0])}
                    />
                    {/*</form>*/}
                    <IconButton
                      sx={{ float: "right" }}
                      aria-label="upload picture"
                      component="span"
                    >
                      <Tooltip title={"Add test image (1600 x 500)"}>
                        <PhotoCamera />
                      </Tooltip>
                    </IconButton>
                  </label>
                  <IconButton onClick={handleOpenColor} sx={{ float: "right" }}>
                    <Tooltip title="Change color">
                      <PaletteIcon />
                    </Tooltip>
                  </IconButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-color"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseColor}
                  >
                    {colors.map((color) => (
                      <MenuItem key={color} onClick={() => handleColor(color)}>
                        <Typography textAlign="center">{color}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                  {/*</FormControl>*/}
                </Box>
                <Input
                  type="text"
                  className="testTitle"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <br />
                <label style={{ fontSize: "13px" }}>
                  Description:
                  <Input
                    style={{ marginLeft: "0.5rem" }}
                    type="text"
                    className="testDescription"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </label>
                <br />
                <label style={{ fontSize: "13px" }}>
                  Topic:
                  <Input
                    style={{ marginLeft: "0.5rem" }}
                    type="text"
                    className="testTopic"
                    value={topicTitle !== "undefined" ? topicTitle : ""}
                    onChange={(e) => {
                      setTestTopic(e.target.value);
                    }}
                  />
                </label>
                <label
                  style={{
                    marginLeft: "2rem",
                    fontSize: "13px",
                  }}
                >
                  Sub-topic:
                  <Input
                    style={{ marginLeft: "0.5rem" }}
                    type="text"
                    className="testTopic"
                    value={subTopic !== "undefined" ? subTopic : ""}
                    onChange={(e) => {
                      setTestSubTopic(e.target.value);
                    }}
                  />
                </label>
                <FormControl sx={{ mt: 2, minWidth: "35%" }} variant="standard">
                  <InputLabel id="select">Type </InputLabel>
                  <Select
                    required
                    labelId="select"
                    id="select"
                    value={testType}
                    onChange={(e) => setTestType(e.target.value)}
                  >
                    {testTypes.map((type) => (
                      <MenuItem key={type.testType} value={type.testType}>
                        {type.testType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ mt: 2, ml: 7, width: "20%" }}
                  variant="standard"
                >
                  <InputLabel id="time">Time </InputLabel>
                  <Input
                    id="time"
                    type="number"
                    error={useTime && (time < 1 || time > 200)}
                    disabled={!useTime}
                    value={time}
                    onChange={(e: any) => {
                      if (e.target.value > -1 || e.target.value < 200)
                        setTime(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">min</InputAdornment>
                    }
                  />
                </FormControl>
                <Tooltip title="1 - 200 min">
                  <FormControlLabel
                    sx={{ mt: 5, ml: 1 }}
                    control={
                      <Switch
                        size="small"
                        checked={useTime}
                        value={useTime}
                        onChange={() => {
                          setUseTime((prevState) => !prevState);
                          if (useTime) setTime(0);
                        }}
                        color="primary"
                      />
                    }
                    label="Use time"
                  />
                </Tooltip>
                {testType === "SCORED" && (
                  <Tooltip title="Enabling this feature will allow users to evaluate text questions on their own (based on the answer feedback) and add points for them after completing the test.">
                    <FormControlLabel
                      sx={{ mt: 5, ml: 1 }}
                      control={
                        <Switch
                          size="small"
                          checked={evaluation}
                          value={evaluation}
                          onChange={() => {
                            setEvaluation((prevState) => !prevState);
                          }}
                          color="primary"
                        />
                      }
                      label="Allow self-evaluation of text questions"
                    />
                  </Tooltip>
                  //                    label="Allow self-evaluation of text questions"
                )}
              </Box>

              {/*{questions.map((question, qindex) => (*/}
              <Box className="user_form_questions">
                <TestQuestions
                  onSave={(
                    questions: IQuestion[],
                    questionsToDelete: string[]
                  ) => handleUpdate(questions, questionsToDelete)}
                  color={color}
                  subTopic={subTopic}
                  testId={test._id}
                  questionsFromProps={questions}
                  testType={test.testType}
                  // topicsFromProps={questionsTopics}
                />
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ResponsesPanel
              testTitle={test.title}
              testId={test._id}
              responses={responses}
              color={color}
              respUsers={testStore.getRespUsers()}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MembersPanel
              setMembers={setMembers}
              testId={test._id}
              members={members}
              color={color}
            />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};

export default observer(TestView);
