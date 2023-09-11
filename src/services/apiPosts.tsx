import supabase, { supabaseUrl } from "./supabase";
import getUserDetails from "../utils/localStorageData";

export async function getAllPosts() {
  const { userId }: { userId: string } = getUserDetails();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("userId", userId);

  if (error) throw new Error("Posts could not be loaded");

  const { data: followingData, error: followingError } = await supabase
    .from("friends")
    .select("followingId")
    .eq("followerId", userId);

  if (followingError) throw new Error("Failed to load post");

  const followedUserIds = followingData.map((row) => row.followingId);
  const { data: followedPosts, error: followedError } = await supabase
    .from("posts")
    .select("*")
    .in("userId", followedUserIds)
    .order("created_at", { ascending: false });

  if (followedError) {
    console.error("Error fetching following posts:", error);
    return [];
  }
  const combineData = followedPosts.length
    ? posts.concat(followedPosts)
    : posts;

  const { data: likes } = await supabase
    .from("likes")
    .select("*")
    .eq("userId", userId);
  const updatedPosts = combineData?.map((post) =>
    likes?.some((like) => like.postId === post.id)
      ? { ...post, isLike: true }
      : { ...post, isLike: false }
  );
  return updatedPosts;
}

export async function createNewPost({
  imageUrl,
  description,
  avatarUrl,
  username,
  userId,
}: {
  imageUrl: File | null;
  description: string;
  avatarUrl: string;
  username: string;
  userId: string;
}) {
  if (imageUrl) {
    const imageName = `${Math.random()}-${imageUrl.name}`.replace(/\//g, "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/posts-image/${imageName}`;
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          description: description,
          avatarUrl: avatarUrl,
          username: username,
          imageUrl: imagePath,
          userId: userId,
        },
      ])
      .select()
      .single();
    if (error) {
      throw new Error("post could not be created");
    }
    const { error: storageError } = await supabase.storage
      .from("posts-image")
      .upload(imageName, imageUrl);

    if (storageError) {
      await supabase.from("posts").delete().eq("id", data?.id); //need to check

      throw new Error(
        "post image could not be uploaded & the cabin was not created"
      );
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          description: description,
          avatarUrl: avatarUrl,
          username: username,
          userId: userId,
        },
      ])
      .select()
      .single();
    if (error) {
      throw new Error("post could not be created");
    }
    return data;
  }
}
