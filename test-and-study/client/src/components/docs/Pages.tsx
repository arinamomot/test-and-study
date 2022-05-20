import { observer } from "mobx-react-lite";
import { Box, Chip, Typography } from "@mui/material";

const Pages = () => {
  return (
    <Box sx={{ pr: 7 }}>
      <Typography>
        <b>Main page: </b>on the main page, you can see 4 recently created tests
        and 4 main buttons for site navigation.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/mainPage.png"
        alt="mainPage"
      />

      <Typography>
        <b>Tests page: </b>on the tests page, you can see all your tests both
        created by you and shared. The page also contains a convenient
        pagination.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/tests.png"
        alt="tests"
      />

      <Typography>
        <b>Search and filtering on the tests page: </b>you can easily find any
        test with the help of convenient search and filtering on the page. You
        can search by both the name of the test and the topic of the test. It
        can also be combined with filters and you can change the direction in
        which the search result will be displayed.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/testsSearch.png"
        alt="testsSearch"
      />

      <Typography>
        <b>Responses page: </b>on the responses page, you can see all your
        responses to certain tests. In the upper right corner of each response,
        you can see the number of points you have scored for the test. Also,
        each answer has information about how many questions out of all you
        answered correctly.
        <br />
        <br />
        By clicking on the "Show response" button you can{" "}
        <b>view this response</b>. You will be redirect to the page with this
        response. You can find more information about the response in the
        section <b>"Preview, Share, Save, Run the test" -{">"} "Response"</b>.{" "}
        <br />
        <br />
        By clicking on the "Run incorrect" button you can{" "}
        <b>run the test only with questions that you answered incorrectly</b> in
        this response.
        <br />
        <br />
        By clicking on the trash icon you can <b>delete response</b>. <br />
        <br />
        You can also <b>run test</b> again by clicking on the "Run" button.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/responses.png"
        alt="responses"
      />
      <Typography>
        <b>Search on the responses page: </b>you can easily find any test with
        the help of convenient search on the page. The search is carried out by
        the name of the test.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/respSearch.png"
        alt="respSearch"
      />
      <br />
      <Typography>
        <b>Documentation page: </b>this is the page you are currently on. Here
        you will find information on how to use the site.
      </Typography>
      <br />
      <Typography>
        <b>Welcome page: </b>first page of the site.
        <br />
        <br />
        By clicking on the "Learn more" button you can
        <b>view basic information about the site</b>.<br />
        <br />
        By clicking on the "Try it now" button you can go to the
        <b>registration page</b> to register on the site.
        <br />
        <br />
        By clicking on the "Login" button you can go to the<b>login page</b> to
        login to your account.
        <br />
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/welcome1.png"
        alt="welcome1"
      />
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/welcome2.png"
        alt="welcome2"
      />

      <Typography>
        <b>Registration page: </b>on this page you can create a new account on
        the site. Each field has a validation. <br />
        If you already have an account, you can <b>go to the login page</b> by
        clicking on the "Already have an account? Log in" button. <br />
        <Chip
          label="You must accept the Terms of use to register on the site."
          color="warning"
          sx={{ mt: 2, mb: 2 }}
        />
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/registration.png"
        alt="registration"
      />

      <Typography>
        <b>Login page: </b>on this page you can login to your account. <br />
        If you don't have an account yet, you can{" "}
        <b>go to the registration page</b> by clicking on the "Don't have an
        account? Sign in" button.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/login.png"
        alt="login"
      />
    </Box>
  );
};

export default observer(Pages);
