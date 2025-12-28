import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

const GuestBanner = () => {
  const { user } = useUserContext();

  // 1. CHECK: Is this a Real User?
  // If the email is real (and NOT our fake 'guest' email), hide the banner.
  const isRealUser = user.email && user.email !== 'guest@example.com';
  
  if (isRealUser) return null;

  return (
    <div className="w-full bg-red text-white py-2 px-4 flex-between text-small-regular sticky top-0 z-50">
      <p>Enjoying the app? Don't lose your data!</p>
      <Link to="/sign-up" className="underline font-bold hover:text-light-2">
        Ready to sign up?
      </Link>
    </div>
  );
};

export default GuestBanner;