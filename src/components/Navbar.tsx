// import { InputBase, styled } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import getUserDetails from "../utils/localStorageData";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import useLogout from "../features/authentication/useLogout";
import Logo from "./Logo";

export default function Navbar() {
  const { isLoading, logout } = useLogout();
  const { searchValue, setSearchValue } = useSearch();
  const { username, avatarUrl }: { username: string; avatarUrl: string } =
    getUserDetails();
  const pathname = useLocation()?.pathname;

  return (
    <div className="grid grid-cols-3 bg-[#7e22ce] text-lg text-white items-center px-8 py-2">
      <div>
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span> Social Media app</span>
        </Link>
      </div>

      {pathname !== "/profile" ? (
        <input
          className=" text-black outline-none py-1 px-2.5 rounded-[10px] placeholder:text-sm "
          type="text"
          placeholder="Search post here..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      ) : (
        <div></div>
      )}

      <div className="flex justify-end gap-4">
        {/* <img /> */}
        <Link to="/profile" className="flex gap-x-2.5">
          <img src={avatarUrl} className="h-[30px] aspect-[1/1] rounded-full" />
          <span className="capitalize">{username}</span>
        </Link>
        <button onClick={() => logout()} disabled={isLoading}>
          <LogoutRoundedIcon />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
