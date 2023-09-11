import { CircularProgress, Divider } from "@mui/material";
import FriendListRow from "./FriendListRow";
import useFriends from "./useFriends";

export default function FriendList() {
  const { isLoading, friendsList } = useFriends();

  if (isLoading) return <CircularProgress />;

  return (
    <div>
      <span className="text-md font-bold">Friend List</span>
      <Divider />
      {friendsList?.length ? (
        <div className="flex flex-col gap-4 mt-4">
          {friendsList.map((friend) => (
            <FriendListRow friend={friend} key={friend.id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-4">
          No Friends Found
        </div>
      )}
    </div>
  );
}
