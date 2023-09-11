import getUserDetails from "../../utils/localStorageData";
import useFollow from "./useFollow";
import useUnfollow from "./useUnfollow";

export default function FriendListRow({
  friend,
}: {
  friend: {
    friendRowId: number;
    avatarUrl: string;
    username: string;
    userId: string;
    isFollow: boolean;
  };
}) {
  const {
    friendRowId,
    avatarUrl,
    username,
    userId: followingId,
    isFollow,
  } = friend;
  const { userId: followerId } = getUserDetails();
  const { followFriend } = useFollow();
  const { unfollowFriend } = useUnfollow();
  return (
    <div className="flex justify-between">
      <div className="flex gap-3 items-center">
        <img
          src={avatarUrl}
          alt="logo"
          className="w-10 aspect-[1] rounded-full outline-1 outline-gray-300"
        />
        <span className="text-sm font-semibold">{username}</span>
      </div>
      <div className="flex justify-center items-center">
        {isFollow ? (
          <button
            className="bg-[#c084fc] text-white px-3 py-1 rounded-full hover:bg-[#7e22ce]"
            onClick={() => unfollowFriend(friendRowId)}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="bg-[#c084fc] text-white px-3 py-1 rounded-full hover:bg-[#7e22ce]"
            onClick={() => followFriend({ followerId, followingId })}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
}
