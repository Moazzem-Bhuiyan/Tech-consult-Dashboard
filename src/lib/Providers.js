"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { mainTheme } from "../theme/mainTheme";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>

      <NextTopLoader />

      <Toaster />
    </AntdRegistry>
  );
}
