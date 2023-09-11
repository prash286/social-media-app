import { Box, Divider, TextField, CircularProgress } from "@mui/material";
import UserCommentsBox from "./UserCommentsBox";
import { useState } from "react";
import useComments from "./useComments";
import useAddComment from "./useAddComment";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid gray",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function CommentBox({
  postId,
  commentsCount,
}: {
  postId: number;
  commentsCount: number;
}) {
  const [userComment, setUserComment] = useState<string>("");
  const { isLoading, comments } = useComments(postId);
  const { addComment } = useAddComment();
  const sortComments = comments
    ?.slice()
    .sort(
      (obj1, obj2) =>
        new Date(obj2.created_at).getTime() -
        new Date(obj1.created_at).getTime()
    );
  function handleClick() {
    if (!userComment) return null;
    addComment({ postId, commentsCount, userComment });
  }

  return (
    <Box sx={style}>
      <div className="flex gap-2 mb-2">
        <TextField
          className="flex-1"
          placeholder="Add a comment"
          onChange={(e) => setUserComment(e.target.value)}
        />
        <div className="flex justify-center items-center">
          <button
            className="bg-indigo-500 text-sm text-white px-3 py-2 rounded-md"
            onClick={handleClick}
          >
            Add comment
          </button>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-2 shadow-[20] p-2 border border-solid border-gray-400 rounded-md mt-2 h-[300px] overflow-y-auto">
        {isLoading ? (
          <CircularProgress />
        ) : (
          sortComments?.map((item) => (
            <UserCommentsBox data={item} key={item.id} />
          ))
        )}
      </div>
    </Box>
  );
}
