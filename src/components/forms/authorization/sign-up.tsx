import { UserAPI } from "@/api";
import RoleSelect from "@/components/role-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TRole } from "@/types";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface SignUpProps {
  onLogin: () => void;
}

type Inputs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  repeat_password: string;
  role: TRole;
  IIN: string;
};

const SignUp: React.FC<SignUpProps> = ({ onLogin }) => {
  const [error, setError] = useState<null | Error>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setError: setFormError,
    clearErrors,
    setValue,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!getValues().role) {
      setFormError("role", {
        message: "Please, select a role!",
      });
      return;
    }
    try {
      await UserAPI.register(data);
      setError(null);
      onLogin?.();
    } catch (e) {
      setError(e as Error);
    }
  };
  const passwordRef = useRef("");
  passwordRef.current = watch("password", "");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[280px] w-full">
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-col gap-2 mb-3">
          <h1 className="text-xl">Sign Up</h1>
          <p>
            {"Create your account to get started and explore all the features."}
          </p>
          {error && (
            <p className="text-red-500">
              There was an issue creating your account. Please check your
              details and try again.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div>
            {errors.IIN && (
              <p className="text-red-500 text-[12px] top-[-16px] right-0">
                IIN is required
              </p>
            )}
            <Input
              placeholder="IIN"
              type="text"
              {...register("IIN", {
                required: true,
              })}
              className=" bg-transparent h-[40px] text-md rounded border-[#c5c5c5] focus-visible:ring-0 focus-visible:border-purple-500"
            />
          </div>

          <div>
            {errors.firstName && (
              <p className="text-red-500 text-[12px] top-[-16px] right-0">
                First Name is required
              </p>
            )}
            <Input
              placeholder="First Name"
              type="text"
              {...register("firstName", {
                required: true,
              })}
              className=" bg-transparent h-[40px] text-md rounded border-[#c5c5c5] focus-visible:ring-0 focus-visible:border-purple-500"
            />
          </div>

          <div>
            {errors.lastName && (
              <p className="text-red-500 text-[12px] top-[-16px] right-0">
                Last Name is required
              </p>
            )}
            <Input
              placeholder="Last Name"
              type="text"
              {...register("lastName", {
                required: true,
              })}
              className=" bg-transparent h-[40px] text-md rounded border-[#c5c5c5] focus-visible:ring-0 focus-visible:border-purple-500"
            />
          </div>

          <div>
            {errors.email && (
              <p className="text-red-500 text-[12px] top-[-16px] right-0">
                {errors.email.message}
              </p>
            )}
            <Input
              placeholder="Email"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                validate: (value) => {
                  if (!value.includes("@")) {
                    return "Email is invalid";
                  }
                },
              })}
              className="bg-transparent h-[40px] text-md rounded border-[#c5c5c5] focus-visible:ring-0 focus-visible:border-purple-500"
            />
          </div>

          <div>
            {errors.password && (
              <p className="text-red-500 text-[12px] top-[-16px] right-0">
                {errors.password.message}
              </p>
            )}
            <Input
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must at least 8 characters long",
                },
              })}
              placeholder="Password"
              className="bg-transparent h-[40px] text-md rounded border-[#c5c5c5] focus-visible:ring-0 focus-visible:border-purple-500"
              type="password"
            />
          </div>

          <div>
            {errors.repeat_password && (
              <p className="text-red-500 text-[12px] top-[-16px] right-0">
                {errors.repeat_password.message}
              </p>
            )}
            <Input
              {...register("repeat_password", {
                required: true,
                validate: (value) => {
                  if (value !== passwordRef.current) {
                    return "Passwords do not match!";
                  }
                },
              })}
              aria-invalid={!!errors.repeat_password}
              placeholder="Repeat password"
              className={cn(
                "bg-transparent h-[40px] relative text-md rounded border-[#c5c5c5] focus-visible:ring-0 focus-visible:border-purple-500"
              )}
              type="password"
            />
          </div>
          <div>
            {errors.role && (
              <p className="text-red-500 text-[12px] top-[-16px] right-0">
                {errors.role.message}
              </p>
            )}
            <RoleSelect
              onValueChange={(value) => {
                setValue("role", value);
                clearErrors("role");
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <Button className="rounded w-full">Sign Up</Button>
          <Button
            onClick={onLogin}
            type="button"
            variant="link"
            className="rounded w-full"
          >
            Already have an account? Log In.
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
