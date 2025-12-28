import PostForm from "@/components/forms/PostForm";
import { useUserContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const { user } = useUserContext();

  // 1. CHECK: Is the current visitor a Guest?
  // We use the same check as in Profile.tsx
  const isGuest = user.email === 'guest@example.com' || !user.email;

  // 2. SCENARIO A: Guest View (Block Access)
  if (isGuest) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center gap-4 py-10 px-5 text-center w-full h-full">
        <img 
          src="/assets/icons/add-post.svg"
          alt="create"
          width={100} 
          height={100}
          className="opacity-50" 
        />
        <h2 className="h2-bold md:h1-bold mt-3">Create a Post</h2>
        <p className="text-light-3 max-w-md body-regular">
          Guests cannot create posts. <br/> 
          Please sign in to share your photos and stories with the community.
        </p>
        <Link to="/sign-in" className="shad-button_primary px-8 py-3 rounded-lg mt-4 flex gap-2">
          <img src="/assets/icons/logout.svg" alt="sign in" width={20} />
          Sign In to Create
        </Link>
      </div>
    );
  }

  // 3. SCENARIO B: Normal View (Show Form)
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;