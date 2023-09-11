import { useQuery } from "@tanstack/react-query";
import { getAllCommentsByPostId } from "../../services/apiComments";

export default function useComments(postId: number) {
  const { isLoading, data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getAllCommentsByPostId(postId),
  });
  return { isLoading, comments };
}
