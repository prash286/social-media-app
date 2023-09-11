export default function UserCommentsBox({
  data,
}: {
  data: {
    avatarUrl: string;
    username: string;
    comment: string;
  };
}) {
  const { avatarUrl, username, comment } = data;
  return (
    <div className="p-2 shadow-[18] border border-solid border-gray-300">
      <div className="flex items-center gap-2">
        <img
          src={avatarUrl}
          alt="logo"
          className="w-7 aspect-[1] rounded-full border border-solid border-indigo-500"
        />
        <span className="capitalize text-sm font-semibold">{username}</span>
      </div>
      <p className="mt-1">{comment}</p>
    </div>
  );
}
