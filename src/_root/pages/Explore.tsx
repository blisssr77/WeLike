import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetRecentPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations";
import useDebounce from "@/hooks/useDebounce";
import { Models } from "appwrite";

// --- Integrated SearchResults Component ---
type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.DocumentList<Models.Document> | undefined; // Correct Appwrite Type
}

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultsProps) => {
  if (isSearchFetching) {
    return <Loader />;
  }

  // Check if we have documents in the response
  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  );
};

// --- Main Explore Component ---
const Explore = () => {
  const [searchValue, setSearchValue] = useState("");
  
  // Debounce prevents spamming the API while you type
  const debouncedSearch = useDebounce(searchValue, 500);

  // Fetching Data
  const { data: posts, isLoading: isPostLoading } = useGetRecentPosts();
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

  // LOGIC: Sort posts by Likes Count (Popularity)
  // We use useMemo so it doesn't re-sort on every small render, only when posts change.
  const popularPosts = useMemo(() => {
    if (!posts?.documents) return [];
    
    // Create a copy [...] to avoid mutating the original array, then sort
    return [...posts.documents].sort((a, b) => {
      const likesA = a.likes?.length || 0;
      const likesB = b.likes?.length || 0;
      return likesB - likesA; // Descending order (High to Low)
    });
  }, [posts]);

  // UI State Checkers
  const shouldShowSearchResults = searchValue !== "";
  // Check if we have popular posts to show (and we aren't searching)
  const shouldShowPosts = !shouldShowSearchResults && popularPosts.length > 0;

  if (isPostLoading && !posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="explore-container">
      {/* --- Search Header --- */}
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search captions..."
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* --- Section Title --- */}
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
        
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      {/* --- Grid Content --- */}
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <GridPostList posts={popularPosts} />
        ) : (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        )}
      </div>
    </div>
  );
};

export default Explore;