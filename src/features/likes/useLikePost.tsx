import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost as likePostApi } from "../../services/apiLikes";

export default function useLikePost() {
  const queryClient = useQueryClient();
  const { mutate: likePost, isLoading } = useMutation({
    mutationFn: ({
      postId,
      likesCount,
    }: {
      postId: number;
      likesCount: number;
    }) => likePostApi(postId, likesCount),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  return { isLoading, likePost };
}
