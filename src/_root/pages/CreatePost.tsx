import PostForm from "@/components/forms/PostForm";
import { useUserContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const { user } = useUserContext();

  // CHECK: If user is a Guest (empty email), block access
  const isGuest = !user.email;

  if (isGuest) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center gap-4 py-10 px-5 text-center">
        <img 
          src="/assets/icons/people.svg" // Use a lock icon if you have one, or reusing gallery-add is fine
          alt="lock"
          width={80} 
          height={80}
          className="opacity-50" 
        />
        <h2 className="h2-bold">Sign in to Create</h2>
        <p className="text-light-3 max-w-md">
          Guest users can browse, but you need an account to share your own photos.
        </p>
        <Link to="/sign-in" className="shad-button_primary px-8 py-3 rounded-lg mt-2">
          Sign In Now
        </Link>
      </div>
    );
  }

  // If regular user, show the form
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