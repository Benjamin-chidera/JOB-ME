"use client";

type child = {
  children: ReactNode;
};

import { Provider } from "react-redux";
import { store } from "./store/store";
import { ReactNode } from "react";

export const Providers = ({ children }: child) => {
  return <Provider store={store}>{children}</Provider>;
};
