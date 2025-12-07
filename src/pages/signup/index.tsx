import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import Button from "../../components/button";
import Input from "../../components/input";

import { AUTH_URL } from "../../constant/url";
import { useSignupMutation } from "../../hooks/use-auth-mutation";

type SignupForm = {
  username: string;
  password: string;
  rePassword: string;
  email: string;
};

const Signup = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<SignupForm>();

  const { mutateAsync: signup, isPending, error, reset } = useSignupMutation();

  const onSubmit = async (data: SignupForm) => {
    try {
      await signup({
        username: data.username,
        password: data.password,
        email: data.email,
      });

      return navigate(AUTH_URL.LOGIN);
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  watch(() => {
    if (error?.message) reset();
  });

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Create a Free Account
      </h2>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <Input
            label="User name"
            required
            placeholder="name@company.com"
            error={errors.username?.message}
            {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^[A-Za-z0-9]{8,10}$/,
                message:
                  "Username must be 8–10 characters and contain only letters or digits.",
              },
            })}
          />
        </div>
        <div className="mb-4">
          <Input
            label="Password"
            type="password"
            placeholder="************"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^[A-Za-z\d@#&!]{12,16}$/,
                message: "Password must be 12–16 characters",
              },
            })}
          />
        </div>
        <div className="mb-4">
          <Input
            label="Re-enter Password"
            type="password"
            placeholder="************"
            error={errors.rePassword?.message}
            {...register("rePassword", {
              required: "Passwords do not match",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
        </div>
        {error?.message && (
          <small className="text-red-600 my-4 block">{error.message}</small>
        )}
        <Button isLoading={isPending} disabled={isPending}>
          Sign Up
        </Button>
      </form>
      <p className="mt-4 text-sm text-center font-semibold text-gray-600">
        Already have an account?
        <a href="/auth/login" className="ml-2 text-blue-700 hover:underline">
          Login here
        </a>
      </p>
    </>
  );
};

export default Signup;
