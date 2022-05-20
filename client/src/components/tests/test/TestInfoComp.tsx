import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { ITest } from "../../../models/ITest";

interface TestInfoCompProps {
  test: ITest;
}

const TestInfoComp = ({ test }: TestInfoCompProps) => {
  return (
    <>
      <Typography>privet</Typography>
    </>
  );
};

export default observer(TestInfoComp);
