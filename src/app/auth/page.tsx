import { Authorization } from "@/components/forms";
import AnimWrapper from "./anim-wrapper";

type TProps = {
  searchParams: {
    type?: "login" | "register";
  };
};

export default function Page({ searchParams }: TProps) {
  return (
    <div className="min-h-screen h-full w-full relative flex sm:p-5 dark:bg-[rgb(26_26_26)]">
      <div className="flex sm:w-[45%] sm:relative absolute inset-0">
        <div className="w-full h-full rounded-[20px] sm:border border-gray-400 overflow-hidden relative">
          <div className="absolute flex justify-center items-center -inset-[10%] ">
            <AnimWrapper />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-[10] sm:relative flex sm:w-[55%] w-full justify-center items-center">
        <div className="dark:bg-[rgb(26_26_26)] rounded-lg sm:border-none border border-blue-500 p-10 shadow">
          <Authorization authType={searchParams.type || "login"} />
        </div>
      </div>
    </div>
  );
}
