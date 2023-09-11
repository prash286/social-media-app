import supabase, { supabaseUrl } from "./supabase";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw new Error(error.message);
  localStorage.setItem(
    "userDetails",
    JSON.stringify({
      userId: data.user.id,
      username: data.user.user_metadata.username,
      avatarUrl: data.user.user_metadata.avatarUrl,
    })
  );
  return data;
}

export async function getCurrentUser() {
  //check user present or not  from localStorage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  //fetch user from supabase
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function signUp({
  email,
  password,
  username,
  imageUrl,
}: {
  email: string;
  password: string;
  username: string;
  imageUrl: File;
}) {
  const imageName = `${Math.random()}-${imageUrl.name}`.replace(/\//g, "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatar/${imageName}`;
  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(imageName, imageUrl);
  if (!storageError) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          avatarUrl: imagePath,
        },
      },
    });
    if (error) {
      await supabase.storage.from("avatar").remove([imageName]);
      throw new Error(error.message);
    }
    await supabase
      .from("profiles")
      .insert([
        { userId: data?.user?.id, username: username, avatarUrl: imagePath },
      ]);

    return data;
  } else {
    throw new Error(
      "image could not be uploaded & the user was not registered"
    );
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  else localStorage.clear();
}
