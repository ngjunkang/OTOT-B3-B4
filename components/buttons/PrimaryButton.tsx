import { Button, Spinner } from "flowbite-react";
import { BaseProps } from "./types";

const PrimaryButton = ({ isLoading, children, ...others }: BaseProps) => {
  return <Button {...others}>{isLoading ? <Spinner /> : children}</Button>;
};

export { PrimaryButton };
