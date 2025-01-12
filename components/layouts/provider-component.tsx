"use client";
import App from "@/App";
import React, { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/context/themeContext";
import { AccessControlProvider } from "@/context/accessControlContext";

interface IProps {
  token?: string;
  children?: ReactNode;
}

const ProviderComponent = ({ token, children }: IProps) => {
  return (
    <>
      <NextTopLoader />
      <ThemeProvider token={token}>
        <AccessControlProvider>
          <App token={token}>{children}</App>
        </AccessControlProvider>
      </ThemeProvider>
    </>
  );
};

export default ProviderComponent;
