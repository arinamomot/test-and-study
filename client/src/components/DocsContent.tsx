import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import CreateNewTest from "./docs/CreateNewTest";
import ChangeTestInfo from "./docs/ChangeTestInfo";
import AddQuestions from "./docs/AddQuestions";
import ChangeAccInfo from "./docs/ChangeAccInfo";
import TestActions from "./docs/TestActions";
import Pages from "./docs/Pages";

const DocsContent = () => {
  const [active, setActive] = useState<number>(0);

  return (
    <Box sx={{ ml: "3%", display: "flex", flexDirection: "row" }}>
      <Box sx={{ width: "22%" }}>
        <Box sx={{ pl: 2, pr: 4, pt: 15 }}>
          <List>
            {[
              "Pages",
              "Change profile information",
              "Create test",
              "Change test information",
              "Add questions to the test",
              "Preview, Share, Save, Run the test",
            ].map((text: string, index: number) => (
              <ListItem
                sx={{ borderRadius: "5px" }}
                onClick={() => setActive(index)}
                button
                key={text}
                className={active === index ? "click" : "notClick"}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Divider orientation="vertical" />

      <Box
        sx={{
          width: "70%",
          flexGrow: 1,
          p: 3,
          mt: 10,
          borderLeft: "1px solid lightgray",
        }}
      >
        <Box ml={6}>
          {active === 0 && <Pages />}
          {active === 1 && <ChangeAccInfo />}
          {active === 2 && <CreateNewTest />}
          {active === 3 && <ChangeTestInfo />}
          {active === 4 && <AddQuestions />}
          {active === 5 && <TestActions />}
        </Box>
      </Box>
    </Box>
  );
};

export default observer(DocsContent);
