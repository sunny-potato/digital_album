import { useRef } from "react";

export function useSaveCurrentValue(currentValue: any) {
  const value = useRef<any>(null);
  if (!value.current) return;
  value.current = currentValue;
  console.log(value);
}
