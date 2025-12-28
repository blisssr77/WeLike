import { Route, Routes, Link, Outlet, useParams, useLocation } from "react-router-dom";
import { LikedPosts } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import GridPostList from "@/components/shared/GridPostList";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  // 1. Fetch the Profile Data from the Database
  const { data: currentUser } = useGetUserById(id || "");

  // 2. CHECK: Is the current visitor a Guest?
  // We check for the specific fake email we assigned in api.ts
  const isGuest = user.email === 'guest@example.com' || !user.email;
  
  // 3. CHECK: Are they trying to view their own profile?
  const isOwnProfile = id === user.id;

  // -------------------------------------------------------------------------
  // SCENARIO A: User Not Found in Database (Guest View)
  // -------------------------------------------------------------------------
  if (!currentUser) {
    // If it's a Guest trying to view their own profile, show the "Guest Banner"
    if (isGuest && isOwnProfile) {
      return (
        <div className="flex flex-col flex-1 items-center justify-center gap-4 py-10 px-5 text-center w-full h-full">
          <img 
            src="/assets/icons/profile-placeholder.svg"
            alt="guest"
            width={100} 
            height={100}
            className="rounded-full opacity-50" 
          />
          <h2 className="h2-bold md:h1-bold mt-3">Guest Mode</h2>
          <p className="text-light-3 max-w-md body-regular">
            You are currently browsing as a Guest. <br/> 
            Create an account to customize your profile, follow others, and like posts.
          </p>
          <Link to="/sign-in" className="shad-button_primary px-8 py-3 rounded-lg mt-4 flex gap-2">
            <img src="/assets/icons/logout.svg" alt="sign in" width={20} />
            Sign In / Sign Up
          </Link>
        </div>
      );
    }

    // If it's not a guest (just slow internet), show Loader
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // SCENARIO B: Normal Profile View (User found in DB)
  // -------------------------------------------------------------------------
  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts?.length || 0} label="Posts" />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            {/* Edit Profile Button (Only visible to Owner) */}
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>

            {/* Follow Button (Only visible to Others) */}
            <div className={`${user.id === id && "hidden"}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;