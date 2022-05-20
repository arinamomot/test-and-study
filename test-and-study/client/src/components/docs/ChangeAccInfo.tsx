import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";

const ChangeAccInfo = () => {
  return (
    <Box sx={{ pr: 7 }}>
      <Typography>
        To view information about your account, you must click on the profile
        icon in the upper right corner in the header. Next, a dropdown menu with
        two options will appear: <br />
        1. <b>My account</b> - click on this to go to your profile information
        page. <br />
        2. Logout - you can click on this to log out of your account.
        <br />
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/openSettings.png"
        alt="openSettings"
      />
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/profile.png"
        alt="profile"
      />
      <Typography>
        <b>Change your information:</b> to change your personal information,
        change the required fields and click the "Change" button. If a green
        notification appears in the lower right corner and the data in the field
        is changed, then everything went well and your personal data was
        successfully changed..
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/changeAcc.png"
        alt="upload1"
      />

      <Typography>
        <b>Upload profile photo:</b> you can add your profile photo by clicking
        on the camera icon.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/upload1.png"
        alt="upload1"
      />
      <Typography>
        Then select a picture from your computer and click on the "Upload"
        button.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/upload2.png"
        alt="upload2"
      />
      <Typography>
        If the photo upload was successful, a green notification will appear in
        the lower right corner and you will see your uploaded photo in the
        current photo section and in the header.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="38px"
        src="../../../static/docs/header.png"
        alt="header"
      />
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/upload3.png"
        alt="upload3"
      />

      <Typography>
        <b>Delete account:</b> to delete an account, click on the "Delete
        account" button. Next, a confirmation window will be shown, click "Yes"
        to delete the account or "No" to go back to the personal information
        page. After deleting your account, you will be redirected to the welcome
        page. <br />
        Please note that deleting an account is an irrevocable action and the
        account will be permanently deleted.
      </Typography>
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/deleteAcc.png"
        alt="deleteAcc"
      />
      <img
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          boxShadow: "0px 6px 5px #ccc",
        }}
        height="350px"
        src="../../../static/docs/deleteAccConfirm.png"
        alt="deleteAccConfirm"
      />
    </Box>
  );
};

export default observer(ChangeAccInfo);
