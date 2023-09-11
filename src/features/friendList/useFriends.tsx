import { useQuery } from "@tanstack/react-query";
import { getAllFriends } from "../../services/apiFriendList";

export default function useFriends() {
  const { data: friendsList, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getAllFriends,
  });
  return { friendsList, isLoading };
}
