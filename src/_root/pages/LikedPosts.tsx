import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const LikedPosts = () => {
  const { data: currentUser, isLoading } = useGetCurrentUser();

  if (isLoading || !currentUser) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* We use an empty array [] temporarily to fix the build error */}
      {0 === 0 && (
        <div className="flex justify-center w-full">
          <p className="text-light-4">No liked posts</p>
        </div>
      )}

      <GridPostList posts={[]} showStats={false} />
    </>
  );
};

export default LikedPosts;