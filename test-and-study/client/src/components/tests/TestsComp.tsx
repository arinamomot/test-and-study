import SearchIcon from "@material-ui/icons/Search";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import { InputAdornment, TextField, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { ITest } from "../../models/ITest";
import { ITopic } from "../../models/ITopic";
import { IUser } from "../../models/IUser";
import { Context } from "../../pages/_app";
import CreateDialog from "../CreateDialog";
import CardComp from "./CardComp";
import usePagination from "./Pagination";
// import ChipInput from 'material-ui-chip-input';
// direction: true - from up to dowm / false  - from down to up
const filters = [
  {
    value: "without",
    label: "Without filter (default)",
  },
  {
    value: "date",
    label: "Creation date",
  },
  {
    value: "alfabetic",
    label: "Name alfabetic",
  },
  {
    value: "created",
    label: "Created tests",
  },
  {
    value: "shared",
    label: "Shared tests",
  },
];

const TestsComp = () => {
  const { testStore } = useContext(Context);
  const [tests, setTests] = useState<ITest[]>([]);
  const [oldTests, setOldTests] = useState<ITest[]>([]);
  const [creators, setCreators] = useState<IUser[]>([]);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [testDeleted, setTestDeleted] = useState<boolean>(false);
  const [testsFiltered, setTestsFiltered] = useState<boolean>(false);
  const [dialogOpen, setDialog] = useState<boolean>(false);
  const [testCreated, setTestCreated] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<ITest[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResultsTopic, setSearchResultsTopic] = useState<ITest[]>([]);
  const [searchTopic, setSearchTopic] = useState<string>("");
  const [searchTopics, setSearchTopics] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("without");
  // direction: true - from up to dowm / false  - from down to up
  const [nameDirection, setNameDirection] = useState<boolean>(true);
  let [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const count = Math.ceil(tests.length / PER_PAGE);
  const paginationTests = usePagination(tests, PER_PAGE);
  let currentUser: string | null = "";
  if (typeof window !== "undefined") {
    if (localStorage.getItem("currentUser"))
      currentUser = localStorage.getItem("currentUser");
  }

  const handleChange = (e: any, p: React.SetStateAction<number>) => {
    setPage(p);
    paginationTests.jump(p);
  };

  const setDeleted = () => {
    setTestDeleted(true);
  };

  const getAllTests = async () => {
    const response = await testStore.getAllTests();
    if (response) {
      setTests(response.data.tests.reverse());
      setOldTests(response.data.tests.reverse());
      setCreators(response.data.creators.reverse());
      setTopics(response.data.topics.reverse());
    }
  };

  const getCreator = (creatorId: string) => {
    const creator = creators.find((item) => item.id === creatorId);
    return { creatorEmail: creator?.email, creatorId: creator?.id };
  };

  const getTopic = (topicId: string) => {
    const topic = topics.find((item) => item.id === topicId);
    return { topic: topic?.title, subTopic: topic?.subTopic };
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

  const searchTopicHandler = (searchTopic: any) => {
    setSearchTopic(searchTopic);
    if (searchTopic.trim()) {
      const newTopicsList = tests.filter((test) => {
        if (test.topic)
          return Object.values(test.topic)
            .join(" ")
            .toLowerCase()
            .includes(searchTopic.toLowerCase());
      });
      setSearchResultsTopic(newTopicsList);
    } else {
      setSearchResultsTopic(tests);
    }
  };

  useEffect(() => {
    getAllTests();
  }, []);

  useEffect(() => {
    if (testDeleted) {
      getAllTests();
      setTestDeleted(false);
    }
  }, [testDeleted]);

  useEffect(() => {
    console.log(tests);
  }, [tests, testsFiltered]);

  const handleDirection = () => {
    setTests(tests.reverse());
    setTestsFiltered((prevState) => !prevState);
  };

  const SortArrayByTitle = (x: any, y: any) => {
    // if (nameDirection) {
    if (x.title < y.title) {
      return -1;
    }
    if (x.title > y.title) {
      return 1;
    }
    // } else {
    //   if (x.title > y.title) {
    //     return -1;
    //   }
    //   if (x.title < y.title) {
    //     return 1;
    //   }
    // }
    return 0;
  };

  const SortArrayByDate = (x: any, y: any) => {
    const date1 = new Date(x.creationDate);
    const date2 = new Date(y.creationDate);
    return date2.valueOf() - date1.valueOf();
    //в обратную сторону (от самого старого) нужно поменять их местами
  };

  const SortArrayByCreated = () => {
    const testsResult: ITest[] = [];
    for (const test of tests) {
      if (currentUser === test.creator) {
        testsResult.push(test);
      }
    }
    return testsResult;
  };

  const SortArrayByShared = () => {
    const testsResult: ITest[] = [];
    for (const test of tests) {
      if (currentUser !== test.creator) {
        testsResult.push(test);
      }
    }
    return testsResult;
  };

  useEffect(() => {
    handleFilter(filter);
  }, [filter]);

  const handleFilter = async (filter: string) => {
    let filteredTests: ITest[];
    switch (filter) {
      case filters[0].value:
        setTests(oldTests);
        break;
      case filters[1].value:
        filteredTests = tests.sort(SortArrayByDate);
        setTests(filteredTests);
        setTestsFiltered((prevState) => !prevState);
        break;
      case filters[2].value:
        filteredTests = tests.sort(SortArrayByTitle);
        setTests(filteredTests);
        setTestsFiltered((prevState) => !prevState);
        break;
      case filters[3].value:
        filteredTests = SortArrayByCreated();
        setTests(filteredTests);
        setTestsFiltered((prevState) => !prevState);
        break;
      case filters[4].value:
        filteredTests = SortArrayByShared();
        setTests(filteredTests);
        setTestsFiltered((prevState) => !prevState);
        break;
    }
  };

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
      <Box
        display="flex"
        sx={{
          width: "60%",
          m: 6,
          mb: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        <Box width="50%" ml={3}>
          <Box>
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
            <TextField
              id="search2"
              placeholder="Search test by topic"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              fullWidth
              value={searchTopic}
              onChange={(e) => {
                searchTopicHandler(e.target.value);
              }}
            />
          </Box>
        </Box>
        <Box width="30%">
          <TextField
            fullWidth
            id="outlined-select"
            select
            label="Filter"
            value={filter}
            onChange={(e) => {
              setTests(oldTests);
              setFilter(e.target.value);
            }}
          >
            {filters.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <IconButton onClick={handleDirection}>
            <Tooltip title="Change direction">
              <SwapVertOutlinedIcon />
            </Tooltip>
          </IconButton>
        </Box>
      </Box>
      <Box className="mainSection">
        <Box textAlign="right">
          <Button
            onClick={handleCreate}
            sx={{ mr: "1rem" }}
            className="darkButton"
            variant="outlined"
          >
            Create new test
          </Button>
        </Box>
        <Typography m={3} variant="h5">
          All tests
        </Typography>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {searchTopic === "" &&
            search === "" &&
            tests &&
            paginationTests
              .currentData()
              .map((test: any) => (
                <CardComp
                  questionsLength={test.questions.length}
                  key={test._id}
                  id={test._id}
                  title={test.title}
                  creatorEmail={getCreator(test.creator).creatorEmail}
                  creatorId={getCreator(test.creator).creatorId}
                  description={test.description}
                  testType={test.testType}
                  date={test.creationDate}
                  setTestDeleted={setDeleted}
                  topic={getTopic(test.topic).topic}
                  subTopic={getTopic(test.topic).subTopic}
                  time={test.time ? test.time : 0}
                  currentUser={currentUser}
                  testImage={test.image}
                />
              ))}
          {search !== "" &&
            searchResults.length > 0 &&
            searchResults.map((test: any) => (
              <CardComp
                questionsLength={test.questions.length}
                key={test._id}
                id={test._id}
                title={test.title}
                creatorEmail={getCreator(test.creator).creatorEmail}
                creatorId={getCreator(test.creator).creatorId}
                description={test.description}
                testType={test.testType}
                date={test.creationDate}
                setTestDeleted={setDeleted}
                topic={getTopic(test.topic).topic}
                subTopic={getTopic(test.topic).subTopic}
                time={test.time ? test.time : 0}
                currentUser={currentUser}
              />
            ))}
          {search === "" &&
            searchTopic !== "" &&
            searchResultsTopic.length > 0 &&
            searchResultsTopic.map((test: any) => (
              <CardComp
                key={test._id}
                id={test._id}
                title={test.title}
                creatorEmail={getCreator(test.creator).creatorEmail}
                creatorId={getCreator(test.creator).creatorId}
                description={test.description}
                testType={test.testType}
                date={test.creationDate}
                setTestDeleted={setDeleted}
                questionsLength={test.questions.length}
                topic={getTopic(test.topic).topic}
                subTopic={getTopic(test.topic).subTopic}
                time={test.time ? test.time : 0}
                currentUser={currentUser}
              />
            ))}
        </Box>
      </Box>
      <Stack sx={{ mt: 2, mb: 2 }} className="centered" spacing={2}>
        <Pagination
          count={count}
          page={page}
          shape="rounded"
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};

export default observer(TestsComp);
