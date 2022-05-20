import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { IUser } from "../../models/IUser";
import { Context } from "../../pages/_app";

interface MembersPanelProps {
  testId: string;
  color?: string | null;
  members: IUser[];
  setMembers: (members: IUser[]) => void;
}

const MembersPanel = ({
  testId,
  color,
  members,
  setMembers,
}: MembersPanelProps) => {
  const { testStore } = useContext(Context);

  const handleDelete = async (memberId: string) => {
    const membersResponse = await testStore.deleteMemberFromTest(
      testId,
      memberId
    );
    if (membersResponse?.data.users) setMembers(membersResponse.data.users);
  };

  const handleDeleteAll = async () => {
    const membersResponse = await testStore.deleteAllMembersFromTest(testId);
    if (membersResponse?.data.users) setMembers(membersResponse.data.users);
  };

  return (
    <Box>
      {members.length > 0 && (
        <Box mr="20%" mb={2} textAlign="right">
          <Button onClick={handleDeleteAll} className="redButton">
            Delete all members
          </Button>
        </Box>
      )}
      {members.length === 0 ? (
        <Box textAlign="center">
          <Typography variant="h6">No members yet.</Typography>
        </Box>
      ) : (
        <Box>
          {members.map((member: IUser, i: number) => (
            <Box className="centered">
              <Box className="membersBox">
                <Box height="60px">
                  <Typography variant="h6">{member.email}</Typography>
                  <Typography mt={1} variant="body1">
                    {member.firstName} {member.lastName}
                  </Typography>
                  <Box textAlign="right" position="relative" top="-55px">
                    <IconButton>
                      <DeleteIcon onClick={() => handleDelete(member.id)} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default observer(MembersPanel);
