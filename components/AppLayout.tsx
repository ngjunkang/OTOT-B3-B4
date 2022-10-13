import { PropsWithChildren } from "react";
import { Container } from "./Container";

const AppLayout = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
};

export { AppLayout };
