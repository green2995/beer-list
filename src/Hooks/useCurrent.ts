import React from "react";

export function useCurrent<T extends object>(obj: T) {
  const ref = React.useRef(obj).current;
  return ref;
}