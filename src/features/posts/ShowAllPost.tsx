import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Post from "./Post";
import usePosts from "./usePosts";
import useSearch from "../../hooks/useSearch";

type Post = {
  id: number;
  description: string;
  imageUrl: string;
  avatarUrl: string;
  username: string;
  likesCount: number;
  commentsCount: number;
};

export default function ShowAllPost() {
  const { searchValue } = useSearch();
  const { isLoading, posts } = usePosts();
  const [filteredData, setFilteredData] = useState<Post[] | null>(null);

  const modifyPostsData = filteredData?.length ? filteredData : posts;
  const sortModifyPostsData = modifyPostsData
    ?.slice()
    .sort(
      (obj1, obj2) =>
        new Date(obj2.created_at).getTime() -
        new Date(obj1.created_at).getTime()
    );

  useEffect(() => {
    if (searchValue) {
      const searchResult = posts?.filter((item) =>
        item.description.toLowerCase().includes(searchValue.toLowerCase())
      );
      searchResult && setFilteredData(searchResult);
    } else {
      setFilteredData([]);
    }
  }, [searchValue, posts]);

  if (isLoading)
    return (
      <div className="border border-green-500 px-2 py-2 overflow-auto flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  if (!modifyPostsData?.length)
    return (
      <div className="border border-green-500 px-2 py-2 flex justify-center items-center">
        <span className="text-xl font-semibold">No Post Found</span>
      </div>
    );
  return (
    <div className="border border-green-500 px-2 py-2 overflow-auto">
      {sortModifyPostsData?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
