import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLES } from "@/constants";
import { TRole } from "@/types";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserInjured } from "react-icons/fa6";

const iconMap: { [key in TRole]: React.ReactNode } = {
  patient: <FaUserInjured />,
  doctor: <FaUserDoctor />,
  admin: <MdOutlineAdminPanelSettings className="scale-125" />,
};

type RoleSelectProps = {
  onValueChange: (value: TRole) => void;
} & Omit<React.ComponentPropsWithoutRef<typeof Select>, "onValueChange">;

const RoleSelect: React.FC<RoleSelectProps> = ({ onValueChange, ...props }) => {
  return (
    <Select
      {...props}
      defaultValue=""
      onValueChange={(v) => onValueChange?.(v as TRole)}
    >
      <SelectTrigger className="rounded border-[#c5c5c5] capitalize outline-none focus-visible:ring-0 focus-visible:border-purple-500">
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(ROLES).map(([key, value]) => {
          return (
            <SelectItem key={key} className=" capitalize" value={value}>
              <div className="flex gap-2 items-center">
                {iconMap?.[key as TRole]}
                {value}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default RoleSelect;
