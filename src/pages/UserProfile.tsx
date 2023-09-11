import Post from "../features/posts/Post";
import usePosts from "../features/posts/usePosts";
import getUserDetails from "../utils/localStorageData";

export default function UserProfile() {
  const { userId, avatarUrl, username } = getUserDetails();
  const { posts } = usePosts();
  const modifyPostData = posts?.filter((post) => post.userId === userId);
  const sortModifyPostsData = modifyPostData
    ?.slice()
    .sort(
      (obj1, obj2) =>
        new Date(obj2.created_at).getTime() -
        new Date(obj1.created_at).getTime()
    );

  return (
    <>
      <div className="h-auto mt-6 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-[60vw] h-auto">
          <div className="flex items-center justify-center border border-[#8000805c] py-2.5 shadow-md bg-[#bca5e4]">
            <img
              src={avatarUrl}
              alt="profile"
              className="w-32 h-32 rounded-full border border-solid border-indigo-500"
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold capitalize">{username}</h2>
            </div>

            <p className="my-5 text-md font-semibold">Your posts: </p>

            <div className="overflow-y-auto h-[42vh] border border-gray-300 shadow-[20] px-2 py-2">
              {sortModifyPostsData?.map((post) => (
                <Post post={post} key={post.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
