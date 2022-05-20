import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IResponse } from "../models/IResponse";
import { ITest } from "../models/ITest";
import { Context } from "../pages/_app";
import AlertComp from "./AlertComp";

interface ResponseCardProps {
  key: number;
  questionsLength: number;
  test: ITest;
  creatorEmail?: string;
}

const ResponseCard = ({
  key,
  test,
  creatorEmail,
  questionsLength,
}: ResponseCardProps) => {
  let { testStore } = useContext(Context);
  const [responses, setResponses] = useState<IResponse[]>([]);

  let currentUserEmail: string | null = "";
  if (typeof window !== "undefined") {
    if (localStorage.getItem("currentUserEmail"))
      currentUserEmail = localStorage.getItem("currentUserEmail");
  }

  useEffect(() => {
    getUserResponses(test._id);
  }, []);

  const getUserResponses = async (testId: string) => {
    const response = await testStore.getUserResponses(testId);
    if (response) {
      setResponses(response.data.responses);
    }
  };

  const handleShowResponse = async (resp: IResponse, userEmail: string) => {
    await testStore.getAllQuestionsByTestId(test._id);
    localStorage.setItem("test", JSON.stringify(test));
    // localStorage.setItem("respPage", JSON.stringify(true));
    await testStore.showMemberResponse(resp, userEmail, true);
  };

  const [deleteResponse, setDeleteResponse] = useState<boolean>(false);

  const handleDeleteResponse = async (respId: string) => {
    await testStore.deleteResponse(respId);
    setDeleteResponse((prevState) => !prevState);
  };

  const handleRunIncorrect = async (respId: string) => {
    await testStore.runIncorrect(respId, test._id);
  };

  useEffect(() => {
    getUserResponses(test._id);
  }, [deleteResponse]);

  return (
    <>
      {testStore.alertBox.show && (
        <AlertComp
          type={testStore.alertBox.type}
          message={testStore.alertBox.message}
        />
      )}
      {responses.length > 0 && (
        <Card
          sx={{
            position: "relative",
            borderRadius: "15px",
            maxWidth: 550,
            width: "50%",
            m: "1rem",
            bgcolor: "#fafafa",
          }}
        >
          <CardContent sx={{ maxHeight: "500px", minHeight: "500px" }}>
            <Box mt={1} ml={2}>
              <Typography variant="h5">Test title: {test.title}</Typography>
              <Typography variant="body1">Creator: {creatorEmail}</Typography>
              <Typography variant="body1">
                Time: {test.time ? `${test.time} min` : "unlimited"}
              </Typography>
            </Box>
            <List
              sx={{
                width: "100%",
                overflow: "auto",
                maxHeight: 400,
                mt: 3,
                mb: 3,
                "& ul": { padding: 0 },
              }}
            >
              {responses.map((resp: IResponse, i: number) => (
                <ListItem key={i}>
                  <Box className="responsesBox2">
                    <Chip
                      size="small"
                      sx={{ width: "auto", float: "right", ml: 2 }}
                      label={`Points: ${resp.userPoints} / ${resp.maxPoints}`}
                    />
                    <Typography variant="body1" mt={1}>
                      {new Date(resp.creationDate)
                        .toUTCString()
                        .replace("GMT", "")}
                    </Typography>
                    {resp.questions.length > 0 && (
                      <Typography variant="body2" mt={1}>
                        Correct answers:{" "}
                        {resp.questions.length - resp.answers.length} /{" "}
                        {resp.questions.length}
                      </Typography>
                    )}
                    <Box textAlign="right" sx={{ mt: 1 }}>
                      <IconButton
                        sx={{ color: "#ff3131" }}
                        size="small"
                        onClick={() => handleDeleteResponse(resp.id)}
                      >
                        <Tooltip title="Delete response">
                          <DeleteIcon />
                        </Tooltip>
                      </IconButton>
                      <Button
                        onClick={() => {
                          if (currentUserEmail !== null)
                            handleShowResponse(resp, currentUserEmail);
                        }}
                        size="small"
                        className="darkButton"
                        sx={{
                          mr: 1,
                          fontSize: "11px",
                          border: "1px solid black",
                        }}
                      >
                        Show response
                      </Button>
                      <Button
                        onClick={() => handleRunIncorrect(resp.id)}
                        className="actionButton"
                        variant="outlined"
                        size="small"
                        disabled={
                          resp.questions.length - resp.answers.length ===
                            resp.questions.length ||
                          resp.questions.length - resp.answers.length === 0
                        }
                        sx={{ fontSize: "11px" }}
                      >
                        Run incorrect
                      </Button>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </CardContent>
          <CardActions sx={{ mt: 3, bottom: 0, right: 0 }}>
            <Grid container justifyContent="flex-end" mr={"10px"} mb={"10px"}>
              <Button
                onClick={() => {
                  localStorage.setItem("run", JSON.stringify(true));
                  localStorage.setItem("preview", JSON.stringify(false));
                  testStore.getAllQuestionsByTestId(test._id);
                  testStore.getTestTypesStore();
                  testStore.getTestById(test._id, true);
                }}
                className="actionButton"
                variant="outlined"
                size="small"
                disabled={questionsLength < 1}
              >
                Run
              </Button>
            </Grid>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default observer(ResponseCard);
