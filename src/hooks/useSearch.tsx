import { useContext } from "react";
import { SearchContext } from "../contextApi/SearchContextProvider";

export default function useSearch() {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
