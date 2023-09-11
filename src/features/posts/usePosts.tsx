import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/apiPosts";

export default function usePosts() {
  const { isLoading, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
  return { isLoading, posts };
}
