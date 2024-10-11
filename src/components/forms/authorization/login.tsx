"use client";
import { UserAPI } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type TLoginProps = {
  onSignUp?: () => void;
};

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC<TLoginProps> = ({ onSignUp }) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState<null | Error>();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setDisabled(true)
      await UserAPI.login(data);
      setError(null);
      router.push("/");
    } catch (e) {
      setError(e as Error);
    } finally {
setDisabled(false)
}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[280px] w-full">
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-col gap-2 mb-3">
          <h1 className="text-3xl">Log In</h1>
          <p>{"We're glad you're back. Please sign in to continue."}</p>
          {error && (
            <p className="text-red-500">
              Login failed. Please ensure your username and password are
              correct.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Input
            {...register("email", {
              required: true,
            })}
            placeholder="Email"
            type="email"
            className=" bg-transparent h-[40px] text-md rounded border-[#c5c5c5] focus-visible:ring-0 focus-visible:border-purple-500"
          />
          <Input
            {...register("password", {
              required: true,
            })}
            placeholder="Password"
            className=" bg-transparent h-[40px] text-md rounded border-[#c5c5c5] focus-visible:ring-0 focus-visible:border-purple-500"
            type="password"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Button disabled={disabled} className="rounded w-full">Log In</Button>
          <Button
            onClick={onSignUp}
            type="button"
            variant="link"
            className="rounded w-full"
          >
            Do not have an account? Sign up.
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Login;
