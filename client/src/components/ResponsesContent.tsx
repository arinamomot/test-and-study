import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { ITest } from "../models/ITest";
import { IUser } from "../models/IUser";
import { Context } from "../pages/_app";
import ResponseCard from "./ResponseCard";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0,0,0)",
    },
    secondary: {
      main: "rgb(255,255,255)",
    },
  },
});

const ResponsesContent = () => {
  const { testStore } = useContext(Context);
  const [tests, setTests] = useState<ITest[]>([]);
  const [creators, setCreators] = useState<IUser[]>([]);
  const [searchResults, setSearchResults] = useState<ITest[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getAllTests();
  }, []);

  let currentUser: string | null = "";
  if (typeof window !== "undefined") {
    if (localStorage.getItem("currentUser"))
      currentUser = localStorage.getItem("currentUser");
  }

  const getAllTests = async () => {
    const response = await testStore.getAllTests();
    if (response) {
      setTests(response.data.tests.reverse());
      setCreators(response.data.creators.reverse());
    }
  };

  const getCreator = (creatorId: string) => {
    const creator = creators.find((item) => item.id === creatorId);
    return { creatorEmail: creator?.email, creatorId: creator?.id };
  };

  const searchTest = (search: any) => {
    setSearch(search);
    if (search.trim()) {
      const newTestsList = tests.filter((test) => {
        return Object.values(test)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResults(newTestsList);
    } else {
      setSearchResults(tests);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
      <Box width="50%" mt={4} ml={10}>
        <TextField
          sx={{ mb: 1 }}
          id="search1"
          placeholder="Search test"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => searchTest(e.target.value)}
        />
      </Box>
      <Box className="mainSection">
        <Typography mt={1} ml={2} variant="h5">
          Responses
        </Typography>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {search === "" &&
            tests.map((test: ITest, i: number) => (
              <ResponseCard
                key={i}
                test={test}
                questionsLength={test.questions.length}
                creatorEmail={getCreator(test.creator).creatorEmail}
              />
            ))}
          {search !== "" &&
            searchResults.length > 0 &&
            searchResults.map((test: any, i: number) => (
              <ResponseCard
                key={i}
                test={test}
                questionsLength={test.questions.length}
                creatorEmail={getCreator(test.creator).creatorEmail}
              />
            ))}
        </Box>
      </Box>
      </ThemeProvider>
    </>
  );
};

export default observer(ResponsesContent);
