import { createContext, useState } from "react";

type Search = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const SearchContext = createContext<Search | null>(null);

export default function SearchContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}
