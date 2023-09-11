import getUserDetails from "../utils/localStorageData";
import supabase from "./supabase";

export async function getAllFriends() {
  const { userId } = getUserDetails();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .neq("userId", userId);

  if (error) throw new Error("Failed to load friend list ");
  const { data: followData, error: followError } = await supabase
    .from("friends")
    .select("followingId,id")
    .eq("followerId", userId);
  const modifyData = data?.map((item) =>
    followData?.some((follow) => follow.followingId === item.userId)
      ? {
          ...item,
          isFollow: true,
          friendRowId: followData?.find(
            (follow) => follow.followingId === item.userId
          )?.id,
        }
      : { ...item, isFollow: false, friendRowId: "" }
  );

  if (followError) throw new Error("something went wrong");
  return modifyData;
}

export async function followFriend(followerId: string, followingId: string) {
  const { data, error } = await supabase
    .from("friends")
    .insert([{ followerId: followerId, followingId: followingId }]);
  if (error) throw new Error("Something went wrong");
  return data;
}

export async function unfollowFriend(friendRowId: number) {
  const { error } = await supabase
    .from("friends")
    .delete()
    .eq("id", friendRowId);

  if (error) throw new Error("Something went wrong");
}
