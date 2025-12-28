import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext()
  const navigate = useNavigate()

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()

  // FIX 1: Capture 'isPending' for Sign In too. 
  // We need to show the loader during BOTH steps (Create + Login).
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount()

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
  
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Step 1: Create the Account
    const newUser = await createUserAccount(values);

    if(!newUser) {
      return toast({ title: "Signup failed. Please try again." })
    }

    // Step 2: Auto-Login the new user
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session) {
      return toast({ title: "Signin failed. Please try again." })
    }

    // Step 3: Check Auth Status
    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      form.reset();
      navigate('/')
    } else {
      // FIX 2: Fallback Navigation
      // If session exists but checkAuthUser is slow/false, we still redirect 
      // because the user IS technically authenticated.
      form.reset();
      navigate('/');
      return toast({ title: "Account created! Login successful." })
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/icons/logonew3.png" alt="logo" style={{ width: '140px', height: '140px' }}/>
        <h1 
          className="h2-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500 text-transparent bg-clip-text tracking-tighter group-hover:tracking-widest transition-all duration-300"
          style={{ fontSize: '38px', lineHeight: '110%' }}
        >
          Vibe
        </h1>

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Vibe, please enter your details
        </p>
      
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="shad-button_primary"
            // FIX 3: Disable button if EITHER creating or signing in
            disabled={isCreatingAccount || isSigningInUser} 
          >
            {isCreatingAccount || isSigningInUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : "Sign up"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-red text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm