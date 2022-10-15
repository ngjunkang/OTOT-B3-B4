import { ButtonHTMLAttributes } from "react";

export type BaseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};
