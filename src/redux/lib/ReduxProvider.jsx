"use client";

import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { Spin } from "antd";

export default function ReduxProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex h-screen items-center justify-center">
            <Spin size="large" />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
