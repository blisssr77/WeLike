import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SigninValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
// FIX 1: Import useSignOutAccount to clear old sessions
import { useSignInAccount, useSignInWithGoogle, useSignInAsGuest, useSignOutAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useEffect } from "react"

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const navigate = useNavigate()

  // Hooks
  const { mutateAsync: signInAccount } = useSignInAccount()
  const { mutateAsync: signInGoogle } = useSignInWithGoogle() 
  const { mutateAsync: signInGuest, isPending: isGuestLoading } = useSignInAsGuest()
  const { mutateAsync: signOutAccount } = useSignOutAccount()

  // As soon as this page loads, kill any old sessions.
  // This ensures the "Sign in with Google" button always starts fresh.
  useEffect(() => {
    const cleanSession = async () => {
      try {
        await signOutAccount();
      } catch (error) {
        // Silently fail if no session exists - that's good!
      }
    };
    cleanSession();
  }, []);

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Standard Email/Password Submit
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    // FIX 2: Force logout first!
    // If a Guest session (or old user session) exists, this clears it so we can log in fresh.
    try {
      await signOutAccount();
    } catch (error) {
      // Ignore error if no session existed
    }

    // 1. Attempt to create session
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    // 2. If no session, the password/email was wrong.
    if (!session) {
      return toast({ title: "Signin failed. Please check your email and password." })
    }

    // 3. Session created successfully! Now check if we can get the profile.
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      console.log("Login successful, but checkAuthUser failed. Navigating to home...");
      form.reset();
      navigate('/');
      
      return toast({ title: "Login successful. Please refresh if data is missing." })
    }
  }

  // Handle Google Login
  const handleGoogleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      // 1. FORCE LOGOUT FIRST
      // This clears any "stale" cookies from previous sessions
      await signOutAccount(); 
    } catch (error) {
      // If there was no session, this fails silently, which is fine
      console.log("No active session to clear");
    }

    try {
      // 2. Now start the fresh Google Login flow
      await signInGoogle();
    } catch (error) {
      toast({ title: "Google sign-in failed. Please try again." });
    }
  }

  // Handle Guest Login
  const handleGuestLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    // FIX 2: Clear session for Guest too
    try { await signOutAccount(); } catch (e) {}

    try {
      await signInGuest();
      const isLoggedIn = await checkAuthUser();
      
      if (isLoggedIn) {
        navigate('/');
        toast({ title: "Welcome, Guest!" });
      }
    } catch (error) {
      toast({ title: "Guest login failed." });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/icons/logonew3.png" alt="logo" style={{ width: '140px', height: '140px' }} />
        <h1 
          className="h2-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500 text-transparent bg-clip-text tracking-tighter group-hover:tracking-widest transition-all duration-300"
          style={{ fontSize: '38px', lineHeight: '110%' }}
        >
          Vibe
        </h1>

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Log in to your account to continue.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  {/* FIX 3: Changed autoComplete from "email" to "current-password" */}
                  <Input type="password" className="shad-input" autoComplete="current-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : "Sign in"}
          </Button>

          {/* ... Divider & Social Buttons ... */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-light-4"></div>
            <span className="flex-shrink mx-4 text-light-3 text-small-regular">OR</span>
            <div className="flex-grow border-t border-light-4"></div>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              type="button" 
              className="shad-button_dark_4 flex gap-2"
              onClick={handleGoogleLogin}
            >
              <img src="/assets/icons/google.svg" alt="google" width={20} />
              Sign in with Google
            </Button>

            <Button 
              type="button" 
              className="shad-button_ghost"
              onClick={handleGuestLogin}
              disabled={isGuestLoading}
            >
               {isGuestLoading ? "Creating session..." : "Continue as Guest"}
            </Button>
          </div>
          
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-red text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm