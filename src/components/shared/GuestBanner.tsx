import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

const GuestBanner = () => {
  const { user } = useUserContext();

  // If user has an email, they are likely a full user, so don't show this.
  // If user.email is empty string, they are a Guest.
  if (user.email) return null;

  return (
    <div className="w-full bg-red text-white py-2 px-4 flex-between text-small-regular sticky top-0 z-50">
      <p>Enjoying the app? Don't lose your data!</p>
      <Link to="/sign-up" className="underline font-bold">
        Ready to sign up?
      </Link>
    </div>
  );
};

export default GuestBanner;