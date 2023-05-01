import { FormattedMessage } from "react-intl";
import React, { useEffect } from "react";

export const helper = () => {
  useEffect(() => {
    console.log("hello");
  }, []);
  return false ? "test string" : "test string 2";
};
