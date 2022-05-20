import { Button, Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import { CSVLink } from "react-csv";
import ReactExport from "react-export-excel";
import React, { useContext, useEffect, useState } from "react";
import { IResponse } from "../../models/IResponse";
import { IUser } from "../../models/IUser";
import { Context } from "../../pages/_app";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

interface ResponsesPanelProps {
  testId: string;
  testTitle: string;
  responses: IResponse[];
  respUsers: IUser[];
  color?: string | null;
}

const ResponsesPanel = ({
  testId,
  responses,
  respUsers,
  color,
  testTitle,
}: ResponsesPanelProps) => {
  let { testStore } = useContext(Context);

  const [responsesToExport, setResponsesToExport] = useState<any[]>([]);

  useEffect(() => {
    const rs: IResponse[] = [...responses];
    let countId = 1;
    for (let i = 0; i < rs.length; i++) {
      rs[i].id = (countId++).toString();
      rs[i].user = respUsers[i].email;
      rs[i].test = responses[i].questions.length.toString();
    }
    setResponsesToExport(rs);
  }, [responses]);

  const headers = [
    { label: "Id", key: "id" },
    { label: "User", key: "user" },
    { label: "Creation date", key: "creationDate" },
    { label: "Questions", key: "test" },
    { label: "User points", key: "userPoints" },
    { label: "Max points", key: "maxPoints" },
  ];

  const csvReport = {
    filename: `${testTitle} - Responses.csv`,
    headers: headers,
    data: responsesToExport,
  };

  const handleShowResponse = async (resp: IResponse, userEmail: string) => {
    await testStore.showMemberResponse(resp, userEmail);
  };

  return (
    <Box>
      {responses.length !== 0 && (
        <Box textAlign="right">
          <ExcelFile
            element={
              <Button
                sx={{ border: "1px solid black", mr: 2, mb: 2 }}
                className="darkButton"
              >
                Export to Excel
              </Button>
            }
          >
            <ExcelSheet
              data={responsesToExport}
              name={`${testTitle} - Responses`}
            >
              <ExcelColumn label="Id" value="id" />
              <ExcelColumn label="User" value="user" />
              <ExcelColumn label="Creation Date" value="creationDate" />
              <ExcelColumn label="Questions" value="test" />
              <ExcelColumn label="User points" value="userPoints" />
              <ExcelColumn label="Max points" value="maxPoints" />
            </ExcelSheet>
          </ExcelFile>

          <Button
            sx={{ border: "1px solid black", mb: 2 }}
            className="darkButton"
          >
            <CSVLink {...csvReport}>Export to CSV</CSVLink>
          </Button>
        </Box>
      )}
      {responses.length === 0 ? (
        <Box textAlign="center">
          <Typography variant="h6">No responses yet.</Typography>
        </Box>
      ) : (
        <Box>
          {responses.map((resp: IResponse, i: number) => (
            <Box className="centered">
              <Box className="responsesBox">
                <Chip
                  size="small"
                  sx={{ width: "auto", float: "right", m: 2 }}
                  label={`Points: ${resp.userPoints} / ${resp.maxPoints}`}
                />
                <Typography variant="h6">User: {respUsers[i].email}</Typography>
                <Typography mt={1}>
                  {new Date(resp.creationDate).toUTCString().replace("GMT", "")}
                </Typography>
                <Box textAlign="right" sx={{ mt: 1 }}>
                  <Button
                    onClick={() => handleShowResponse(resp, respUsers[i].email)}
                    size="small"
                    className="darkButton"
                    sx={{ border: "1px solid black" }}
                  >
                    Show response
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default observer(ResponsesPanel);
