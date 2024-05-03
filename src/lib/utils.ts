import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function clsxm(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
