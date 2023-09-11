import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { styled } from "@mui/material";
import SearchContextProvider from "../contextApi/SearchContextProvider";

export default function AppLayout() {
  const Main = styled("div")(({ theme }) => ({
    padding: theme.spacing(1, 8),
  }));

  return (
    <>
      <SearchContextProvider>
        <>
          <Navbar />
          <Main>
            <Outlet />
          </Main>
        </>
      </SearchContextProvider>
    </>
  );
}
