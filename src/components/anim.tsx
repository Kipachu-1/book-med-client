import { cn } from "@/lib/utils";
import { FaRegHospital } from "react-icons/fa6";
type AnimProps = {
  isMobile?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const containers: {
  [key: number]: React.ReactNode;
} = {
  6: (
    <div className="absolute overflow-hidden border flex-col cursor-pointer bg-purple-400 z-10 rounded-[16px] cube-1 inset-0 flex items-end">
      <div className="w-full h-full p-3 box-border opacity-60">
        <div className="bg-with-pluses w-full h-full"></div>
      </div>
      <div className="flex flex-col w-full p-5 text-xs sm:text-xl">
        <p className=" line-clamp-1">Total Care.</p>
        <p className="line-clamp-1">Total Different.</p>
      </div>
    </div>
  ),
  9: (
    <div className="absolute overflow-hidden border cursor-pointer bg-purple-400 z-10  rounded-[16px] cube-2 inset-0 flex justify-center items-center">
      <FaRegHospital className="text-3xl scale-[2] text-black" />
    </div>
  ),
  10: (
    <div className="absolute overflow-hidden border cursor-pointer flex-col bg-[#EDE59C] z-10  rounded-[16px] cube-3 inset-0 flex items-end">
      <div className="relative w-full h-full">
        <div className="absolute z-10 left-4 top-4 flex items-end">
          <div
            style={{ backgroundSize: "30px 30px" }}
            className="bg-[url(/assets/imgs/plus.png)] bg-no-repeat w-[40px] aspect-square"
          ></div>
        </div>
      </div>
      <div className="flex flex-col w-full p-5 sm:text-xl">
        <p className="line-clamp-2 sm:line-clamp-none">
          Transforming healthcare through appointments.
        </p>
      </div>
    </div>
  ),
  13: (
    <div className="absolute overflow-hidden flex-col border cursor-pointer bg-[#EDE59C] z-10  rounded-[16px] cube-4 inset-0 flex items-end">
      <div className="relative w-full h-full">
        <div className="absolute z-10 left-4 top-4 flex items-end">
          <div
            style={{ backgroundSize: "30px 30px" }}
            className="bg-[url(/assets/imgs/plus.png)] bg-no-repeat w-[40px] aspect-square"
          ></div>
        </div>
      </div>
      <div className="flex flex-col w-full p-5 sm:text-xl">
        <p className="line-clamp-2">Book your health with us.</p>
      </div>
    </div>
  ),
};

const Anim: React.FC<AnimProps> = ({ ...props }) => {
  return (
    <div {...props} className={cn("text-black", props.className)}>
      <div className="grid grid-cols-4 grid-rows-5 h-full aspect-[4/5] gap-3 [&>div]:rounded-[16px] ">
        {Array.from({ length: 20 }).map((_, index) => {
          return (
            <div
              key={index}
              className={cn(
                "min-w-full bg-[url(/assets/imgs/waves.jpeg)] bg-contain bg-fixed grid aspect-square h-full border relative",
                [5, 6, 9, 10, 13, 14].includes(index) &&
                  "after:absolute after:block after:z-9 after:inset-0 after:backdrop-blur-sm after:rounded-[inherit]"
              )}
            >
              {containers?.[index] || null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Anim;
