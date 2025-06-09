import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

import Layout from "@notestack/components/Layout";

const LayoutProvider = ({ children }: PropsWithChildren) => {
  return <Layout>{children}</Layout>;
};

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <LayoutProvider>{children}</LayoutProvider>
    </BrowserRouter>
  );
};

export default Provider;
