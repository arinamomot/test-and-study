import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ITest } from "../../models/ITest";
import BackButton from "../BackButton";
import ResponseView from "./test/ResponseView";

const TestSubmittedPage = () => {
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  let points = 0;
  let maxPoints = 0;
  let test: ITest = {} as ITest;
  let showResponse: boolean = false;
  let userEmail: string | null = "";
  let currentUserEmail: string | null = "";
  let respPage: boolean = false;
  if (typeof window !== "undefined") {
    if (localStorage.getItem("points"))
      points = JSON.parse(localStorage.getItem("points") || "");
    if (localStorage.getItem("maxPoints"))
      maxPoints = JSON.parse(localStorage.getItem("maxPoints") || "");
    if (localStorage.getItem("test"))
      test = JSON.parse(localStorage.getItem("test") || "");
    if (localStorage.getItem("showResponse"))
      showResponse = JSON.parse(localStorage.getItem("showResponse") || "");
    if (localStorage.getItem("userEmail"))
      userEmail = localStorage.getItem("userEmail");
    if (localStorage.getItem("currentUserEmail"))
      currentUserEmail = localStorage.getItem("currentUserEmail");
    if (localStorage.getItem("respPage"))
      respPage = JSON.parse(localStorage.getItem("respPage") || "");
  }

  const handleBackShowResponse = () => {
    if (localStorage.getItem("preview")) localStorage.removeItem("preview");
    if (localStorage.getItem("showResponse"))
      localStorage.removeItem("showResponse");
    if (localStorage.getItem("userEmail")) localStorage.removeItem("userEmail");
    if (localStorage.getItem("points")) localStorage.removeItem("points");
    if (localStorage.getItem("maxPoints")) localStorage.removeItem("maxPoints");
    if (localStorage.getItem("userAnswers"))
      localStorage.removeItem("userAnswers");
    if (localStorage.getItem("responseId"))
      localStorage.removeItem("responseId");
    if (localStorage.getItem("respPage")) localStorage.removeItem("respPage");
  };

  const [userPoint, setUserPoint] = useState(
    typeof window !== "undefined" && localStorage.getItem("points")
      ? JSON.parse(localStorage.getItem("points") || "")
      : 0
  );

  const updateUserPoints = () => {
    let userAnswers = [];
    if (localStorage.getItem("userAnswers"))
      userAnswers = JSON.parse(localStorage.getItem("userAnswers") || "");
    let pointss = 0;
    for (const ans of userAnswers) {
      pointss += ans.userPoints;
    }
    setUserPoint(pointss);
  };

  return (
    <>
      <Box sx={{ mt: 2, ml: 2 }}>
        {showResponse ? (
          <Button
            href={`/test/${test._id}`}
            className="backButtonTestView"
            variant="outlined"
            sx={{ m: "1rem" }}
            onClick={handleBackShowResponse}
          >
            <ArrowBackIcon sx={{ mr: "0.5rem" }} fontSize="small" />
            Back to the test page
          </Button>
        ) : (
          <BackButton
            pageName={"main"}
            className={"backButtonTestView"}
            href={"/main"}
          />
        )}
      </Box>
      <Box sx={{ textAlign: "center", mt: 10, mb: 4 }}>
        {!showResponse && !respPage && (
          <Typography variant="h5">
            The test was successfully submitted.
          </Typography>
        )}
        {test.testType === "SCORED" &&
          (showResponse ? (
            <Typography sx={{ mt: 2 }}>
              {userEmail === currentUserEmail ? "Your" : userEmail} points:{" "}
              {userPoint || userPoint === 0 ? userPoint : ""}{" "}
              {maxPoints ? `/${maxPoints}` : ""}
            </Typography>
          ) : (
            <Typography sx={{ mt: 2 }}>
              Your points: {userPoint || userPoint === 0 ? userPoint : ""}{" "}
              {maxPoints ? `/${maxPoints}` : ""}
            </Typography>
          ))}
        <Box sx={{ m: 2 }}>
          <Button
            onClick={() => {
              setShowAnswers((prevState) => !prevState);
            }}
            className="actionButton"
          >
            {showAnswers ? "Hide answers" : "View answers"}
          </Button>
        </Box>
        {showAnswers && <ResponseView onChange={updateUserPoints} />}
      </Box>
    </>
  );
};

export default observer(TestSubmittedPage);
