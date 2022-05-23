import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { ITest } from "../models/ITest";
import { ITopic } from "../models/ITopic";
import { IUser } from "../models/IUser";
import { Context } from "../pages/_app";
import CreateDialog from "./CreateDialog";
import CardComp from "./tests/CardComp";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface MainSectionProps {
  title: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(255,255,255)",
    },
    secondary: {
      main: "rgb(0,0,0)",
    },
  },
});

const MainSection = ({ title }: MainSectionProps) => {
  const { testStore } = useContext(Context);
  const [dialogOpen, setDialog] = useState<boolean>(false);
  const [tests, setTests] = useState<ITest[]>([]);
  const [creators, setCreators] = useState<IUser[]>([]);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [testCreated, setTestCreated] = useState<boolean>(false);
  const [testDeleted, setTestDeleted] = useState<boolean>(false);

  const getAllTests = async () => {
    const response = await testStore.getAllTests();
    if (response) {
      setTests(response.data.tests.reverse().slice(0, 4));
      setCreators(response.data.creators.reverse().slice(0, 4));
      setTopics(response.data.topics.reverse().slice(0, 4));
    }
  };

  const getCreator = (creatorId: string) => {
    const creator = creators.find((item) => item.id === creatorId);
    return { creatorEmail: creator?.email, creatorId: creator?.id };
  };

  const getTopic = (topicId: string) => {
    const topic = topics.find((item: ITopic) => item.id === topicId);
    return { title: topic?.title, subTopic: topic?.subTopic };
  };

  let currentUser: any = "";
  if (typeof window !== "undefined") {
    currentUser =
      localStorage.getItem("currentUser") !== null
        ? localStorage.getItem("currentUser")
        : "";
  }

  useEffect(() => {
    getAllTests();
  }, []);

  useEffect(() => {
    if (testDeleted) {
      getAllTests();
      setTestDeleted(false);
    }
    if (testCreated) {
      getAllTests();
      setTestCreated(false);
    }
  }, [testCreated, testDeleted]);

  const handleCreate = () => {
    setDialog((prevState) => !prevState);
  };

  return (
    <>
      <CreateDialog
        setTestCreated={() => setTestCreated(true)}
        open={dialogOpen}
        setOpen={setDialog}
      />
      <ThemeProvider theme={theme}>
      <Grid container alignItems="center">
        <Grid>
          <Typography m="1rem" variant="h5" component="h5">
            {title}
          </Typography>
        </Grid>
        <Grid sx={{ ml: "auto" }}>
          <Button
            onClick={handleCreate}
            sx={{ mr: "1rem" }}
            className="darkButton"
            variant="outlined"
          >
            Create new test
          </Button>
        </Grid>
      </Grid>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {tests &&
          tests.map((test: ITest) => (
            <CardComp
              key={test._id}
              id={test._id}
              title={test.title}
              creatorEmail={getCreator(test.creator).creatorEmail}
              creatorId={getCreator(test.creator).creatorId}
              description={test.description}
              testType={test.testType}
              date={test.creationDate}
              setTestDeleted={() => setTestDeleted(true)}
              topic={getTopic(test.topic).title}
              subTopic={getTopic(test.topic).subTopic}
              time={test.time ? test.time : 0}
              currentUser={currentUser}
              questionsLength={test.questions.length}
              testImage={test.image}
            />
          ))}
      </Box>
      </ThemeProvider>
    </>
  );
};

export default observer(MainSection);
