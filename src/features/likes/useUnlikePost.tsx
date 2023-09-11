import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikePost as unlikePostApi } from "../../services/apiLikes";

export default function useUnlikePost() {
  const queryClient = useQueryClient();
  const { mutate: unlikePost, isLoading } = useMutation({
    mutationFn: ({
      postId,
      likesCount,
      userId,
    }: {
      postId: number;
      likesCount: number;
      userId: number;
    }) => unlikePostApi(userId, postId, likesCount),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  return { isLoading, unlikePost };
}
