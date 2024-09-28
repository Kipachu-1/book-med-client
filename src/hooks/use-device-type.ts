import { useState, useEffect } from "react";

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      if (
        /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        setIsMobile(true);
      }
    };

    checkDevice();
  }, []);

  return {
    isMobile,
  };
};
