// import { styled } from "@mui/material";

import { styled } from "@mui/material";
import CreatePost from "../features/posts/CreatePost";
import ShowAllPost from "../features/posts/ShowAllPost";
import FriendList from "../features/friendList/FriendList";

export default function NewsFeed() {
  const NewsFeedContainer = styled("div")(() => ({
    display: "grid",
    gridTemplateColumns: "auto 25rem",
    gap: "1.5rem",
  }));

  return (
    <NewsFeedContainer>
      <section className="h-[90dvh] grid grid-rows-[0.25fr_1fr] border-red-500">
        <CreatePost />
        <ShowAllPost />
      </section>
      <aside className="h-[90dvh] border border-green-500 p-[4vh_2vw]">
        <FriendList />
      </aside>
    </NewsFeedContainer>
  );
}
