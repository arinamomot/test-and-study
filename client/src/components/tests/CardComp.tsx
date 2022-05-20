import { Chip } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { useContext, useState } from "react";
import { Context } from "../../pages/_app";
import ConfirmModal from "../ConfirmModal";

interface CardProps {
  id: string;
  questionsLength: number;
  title: string;
  description: string;
  testType: string;
  testImage?: string;
  creatorEmail?: string;
  creatorId?: string;
  date: Date;
  setTestDeleted: Function;
  topic?: string;
  subTopic?: string;
  time?: number;
  currentUser?: string | null;
}

const CardComp = ({
  id,
  title,
  description,
  testType,
  creatorEmail,
  creatorId,
  date,
  setTestDeleted,
  topic,
  subTopic,
  time,
  currentUser,
  questionsLength,
  testImage,
}: CardProps) => {
  const { testStore } = useContext(Context);
  const [openConfirm, setConfirmOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    await testStore.deleteTest(id);
    setTestDeleted();
  };

  return (
    <>
      <ConfirmModal
        title={"Delete Test"}
        text={
          "Do you really want to permanently delete this test? This is permanent and irreversible."
        }
        open={openConfirm}
        onConfirm={handleDelete}
        setOpen={setConfirmOpen}
      />
      <Card
        sx={{
          position: "relative",
          borderRadius: "15px",
          maxHeight: 450,
          maxWidth: 260,
          m: "1rem",
          bgcolor: "#fafafa",
        }}
      >
        {testImage ? (
          <CardMedia
            component="img"
            height="110"
            image={`../uploads/${testImage}`}
            alt="image"
          />
        ) : (
          <CardMedia
            component="img"
            height="110"
            image="../images/b.jpg"
            alt="image"
          />
        )}
        <CardContent sx={{ maxHeight: "250px", minHeight: "270px" }}>
          <Typography variant="body2" sx={{ float: "right" }}>
            {moment(date).fromNow()}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            {title?.charAt(0).toUpperCase() + title?.slice(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Description:</b>{" "}
            {description?.length > 90
              ? description?.slice(0, 90).concat("...")
              : description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Creator:</b> {creatorEmail ? creatorEmail : ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Type:</b> {testType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Creation date:</b> {new Date(date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Questions:</b> {questionsLength}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Time:</b> {time !== 0 ? `${time} min` : "unlimited"}
          </Typography>
          {topic && topic !== "undefined" && (
            <Chip sx={{ mt: 1, mr: 1 }} label={topic} />
          )}
          {subTopic && subTopic !== "undefined" && (
            <Chip sx={{ mt: 1 }} label={subTopic} />
          )}
        </CardContent>
        <CardActions sx={{ bottom: 0, right: 0 }}>
          <Grid container justifyContent="flex-end" mr={"10px"} mb={"10px"}>
            <Button
              onClick={() => setConfirmOpen(true)}
              className="redButton"
              variant="contained"
              size="small"
              sx={{ mr: 1 }}
            >
              Delete
            </Button>
            {currentUser === creatorId && (
              <Button
                onClick={() => {
                  testStore.getAllQuestionsByTestId(id);
                  testStore.getTestTypesStore();
                  testStore.getTestById(id, false);
                }}
                className="darkButton"
                sx={{ mr: 1, borderColor: "#fafafa !important" }}
                variant="outlined"
                size="small"
              >
                Change
              </Button>
            )}
            <Button
              onClick={() => {
                localStorage.setItem("run", JSON.stringify(true));
                localStorage.setItem("preview", JSON.stringify(false));
                testStore.getAllQuestionsByTestId(id);
                testStore.getTestTypesStore();
                testStore.getTestById(id, true);
              }}
              sx={{ border: "none" }}
              className="darkButton"
              variant="outlined"
              size="small"
              disabled={questionsLength < 1}
            >
              Run
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default observer(CardComp);
