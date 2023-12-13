import { useEffect, useRef } from "react";

export const useDetectClickOutsideDropDown = (setIsItDropDown: {
  setIsItDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const isItDropDown = ref.current?.contains(event.target as Node);
      if (isItDropDown === undefined || !isItDropDown) {
        setIsItDropDown(false);
      } else {
        setIsItDropDown(true);
      }
    };

    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [setIsItDropDown]);
  return ref;
};
