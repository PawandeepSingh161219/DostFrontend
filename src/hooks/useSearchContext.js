import { createContext, useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";

export default function useSearchContext() {

  const context =
    useContext(SearchContext);

  if (!context) {

    throw new Error(

      "useSearch must be used inside SearchProvider"
    );
  }

  return context;
}