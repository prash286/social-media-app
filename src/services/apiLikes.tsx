import getUserDetails from "../utils/localStorageData";
import supabase from "./supabase";

export async function likePost(postId: number, likesCount: number) {
  const { userId }: { userId: string } = getUserDetails();
  const { error } = await supabase.from("likes").insert([
    {
      userId: userId,
      postId: postId,
    },
  ]);
  if (error) {
    console.error("Error liking the post:", error.message);
    return;
  }

  const { error: postError } = await supabase
    .from("posts")
    .update({ likesCount: likesCount + 1 })
    .eq("id", postId);

  if (postError) {
    console.error("Error updating like count:", postError.message);
    return;
  }
}

export async function unlikePost(
  userId: number,
  postId: number,
  likesCount: number
) {
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("userId", userId)
    .eq("postId", postId);

  if (error) {
    console.error("Error unliking the post:", error.message);
    return;
  }

  const { error: postError } = await supabase
    .from("posts")
    .update({ likesCount: likesCount - 1 })
    .eq("id", postId);

  if (postError) {
    console.error("Error updating like count:", postError.message);
    return;
  }
}
