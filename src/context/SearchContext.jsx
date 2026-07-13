import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

// ======================
// CONTEXT
// ======================

export const SearchContext =
  createContext();

// ======================
// PROVIDER
// ======================

export default function SearchProvider({

  children,

}) {


  // ======================
  // RECENT SEARCHES
  // ======================

  const [
    recentSearches,
    setRecentSearches,
  ] = useState([]);

  // ======================
  // SEARCH RESULTS
  // ======================

  const [
    searchResults,
    setSearchResults,
  ] = useState(null);

  // ======================
  // SEARCH QUERY
  // ======================

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");


  const addRecentSearch = useCallback((query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return; // Don't add empty queries
    setRecentSearches((prev) => {
      const filtered =
        prev.filter(
          (item) =>
            item.toLowerCase() !==
            trimmedQuery.toLowerCase()
        );
      return [trimmedQuery,
        ...filtered,
      ].slice(0, 5); // Keep only the latest 5 searches

    });
  }, []);

  return (

    <SearchContext.Provider
      value={{

        searchResults,

        setSearchResults,

        searchQuery,

        setSearchQuery,

        recentSearches,
        addRecentSearch,

      }}
    >

      {children}

    </SearchContext.Provider>
  );
}

// export function useSearch() {

//   const context =
//     useContext(SearchContext);

//   if (!context) {

//     throw new Error(

//       "useSearch must be used inside SearchProvider"
//     );
//   }

//   return context;
// }