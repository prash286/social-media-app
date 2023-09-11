import getUserDetails from "../utils/localStorageData";
import supabase from "./supabase";

export async function getAllCommentsByPostId(postId: number) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("postId", postId);
  if (error) throw new Error("Comments could not be loaded");
  return data;
}

export async function addComment(
  postId: number,
  commentsCount: number,
  userComment: string
) {
  const { avatarUrl, username, userId } = getUserDetails();
  const { error } = await supabase
    .from("comments")
    .insert([
      {
        avatarUrl: avatarUrl,
        username: username,
        postId: postId,
        comment: userComment,
        userId: userId,
      },
    ])
    .select();

  if (error) {
    throw new Error("Failed to add comment");
  }
  if (!error) {
    const { error: postError } = await supabase
      .from("posts")
      .update({ commentsCount: commentsCount + 1 })
      .eq("id", postId);
    if (postError) {
      throw new Error("Failed to update comment");
    }
  }
}
