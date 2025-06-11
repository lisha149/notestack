import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "@notestack/components/Layout";

const LayoutProvider = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover
      />
      {children}
    </Layout>
  );
};

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <LayoutProvider>{children}</LayoutProvider>
    </BrowserRouter>
  );
};

export default Provider;
