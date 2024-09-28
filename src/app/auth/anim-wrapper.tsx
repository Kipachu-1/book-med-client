"use client";
import Anim from "@/components/anim";
import { useDeviceType } from "@/hooks";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AnimWrapperProps {}

const AnimWrapper: React.FC<AnimWrapperProps> = () => {
  const [mounted, setMounted] = useState(false);
  const { isMobile } = useDeviceType();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (mounted)
    return (
      <Anim
        className={cn(isMobile ? "h-full sm:h-auto sm:w-full" : " h-full")}
      />
    );
};

export default AnimWrapper;
