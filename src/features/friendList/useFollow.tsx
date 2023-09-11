import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followFriend as followFriendApi } from "../../services/apiFriendList";

export default function useFollow() {
  const queryClient = useQueryClient();

  const { mutate: followFriend, isLoading } = useMutation({
    mutationFn: ({
      followerId,
      followingId,
    }: {
      followerId: string;
      followingId: string;
    }) => followFriendApi(followerId, followingId),
    onSuccess: () => {
      queryClient.invalidateQueries(["friends"]);
      queryClient.invalidateQueries(["posts"]);
    },
  });
  return { followFriend, isLoading };
}
