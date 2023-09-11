import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment as addCommentApi } from "../../services/apiComments";

export default function useAddComment() {
  const queryClient = useQueryClient();

  const { mutate: addComment, isLoading } = useMutation({
    mutationFn: ({
      postId,
      commentsCount,
      userComment,
    }: {
      postId: number;
      commentsCount: number;
      userComment: string;
    }) => addCommentApi(postId, commentsCount, userComment),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      queryClient.invalidateQueries(["posts"]);
    },
  });
  return { addComment, isLoading };
}
