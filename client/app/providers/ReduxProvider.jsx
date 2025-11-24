"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import Navbar from "@/components/Navbar";

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <Navbar />
        {children}
    </Provider>
  )
};

export default ReduxProvider;
