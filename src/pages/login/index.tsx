import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import Button from "../../components/button";
import CheckBox from "../../components/check-box";
import Input from "../../components/input";

import { useLoginMutation } from "../../hooks/use-auth-mutation";

import { TOKEN } from "../../constant/auth";
import { DASHBOARD_URL } from "../../constant/url";

type LoginForm = {
  username: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<LoginForm>();

  const { mutateAsync: login, isPending, error, reset } = useLoginMutation();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login({
        username: data.username,
        password: data.password,
      });

      const { accessToken } = response.data;
      localStorage.setItem(TOKEN, accessToken);
      return navigate(DASHBOARD_URL.BASE);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  watch(() => {
    if (error?.message) reset();
  });

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Sign in to platform
      </h2>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <Input
            label="User name"
            required
            placeholder="Enter your username"
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
            placeholder="Enter your password"
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
        <div className="my-4">
          <CheckBox label="Remember me" {...register("remember")} />
        </div>
        {error?.message && (
          <small className="text-red-600 my-4 block">{error.message}</small>
        )}
        <Button isLoading={isPending} disabled={isPending}>
          Login
        </Button>
      </form>
      <p className="mt-4 text-sm text-center font-semibold text-gray-600">
        Don't have an account?
        <a href="sign-up" className="ml-2 text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </>
  );
};

export default Login;
