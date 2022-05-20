import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTimer } from "react-timer-hook";
import { useState } from "react";

interface MyTimerProps {
  expiryTimestamp: any;
  testTime: any;
  type: boolean;
  onExpire: Function;
}

const MyTimer = ({
  expiryTimestamp,
  testTime,
  type,
  onExpire,
}: MyTimerProps) => {
  const [color, setColor] = useState<string>("black");

  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => {
        //TODO save and close test
        setColor("red");
        localStorage.setItem("timerOver", JSON.stringify(true));
        onExpire();
      },
    });

  return (
    <Box
      sx={{ textAlign: "center", position: "fixed", right: "3%", top: "42%" }}
    >
      <TimerOutlinedIcon sx={{ color: `${color}` }} />
      <Box sx={{ fontSize: "26px", fontFamily: "Roboto", color: `${color}` }}>
        <span>0{hours}</span>:
        <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
        <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </Box>
      <Typography sx={{ color: `${color}` }}>
        {isRunning ? "Running" : "Not running"}
      </Typography>
      {type && (
        <Box>
          {/*<Button className="darkButton" size="small" sx={{border: "1px solid black", mr: 1}} onClick={start}>Start</Button>*/}
          <Button
            className="darkButton"
            size="small"
            sx={{ border: "1px solid black", mr: 1 }}
            onClick={pause}
          >
            Pause
          </Button>
          <Button
            className="darkButton"
            size="small"
            sx={{ border: "1px solid black", mr: 1 }}
            onClick={resume}
          >
            Resume
          </Button>
          <Button
            size="small"
            className="darkButton"
            sx={{ border: "1px solid black" }}
            onClick={() => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + testTime * 60);
              setColor("black");
              restart(time);
            }}
          >
            Restart
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MyTimer;
