import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// transform array of strings to options for select
export function transformArrayToOptions(arr: string[]) {
  return arr.map((item) => ({
    value: item.toLowerCase(),
    label: item,
  }));
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): { (...args: Parameters<T>): void; cancel: () => void } {
  let timeout: NodeJS.Timeout | undefined;

  const debouncedFunction = (...args: Parameters<T>): void => {
    const later = () => {
      timeout = undefined;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeout);
  };

  return debouncedFunction;
}
