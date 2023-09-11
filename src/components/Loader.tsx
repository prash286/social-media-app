import { CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress />
    </div>
  );
}
