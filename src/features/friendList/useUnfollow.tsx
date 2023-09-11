import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowFriend as unfollowFriendApi } from "../../services/apiFriendList";

export default function useUnfollow() {
  const queryClient = useQueryClient();

  const { mutate: unfollowFriend, isLoading } = useMutation({
    mutationFn: (friendRowId: number) => unfollowFriendApi(friendRowId),
    onSuccess: () => {
      queryClient.invalidateQueries(["friends"]);
      queryClient.invalidateQueries(["posts"]);
    },
  });
  return { unfollowFriend, isLoading };
}
