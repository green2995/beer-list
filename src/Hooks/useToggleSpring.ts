import { SpringConfig, SpringValue, useSpring } from "@react-spring/core"
import React from "react";

export function useToggleSpring<T extends Record<string, boolean>>(definition: T, config?: SpringConfig) {
  const [spring, api] = useSpring(() => ({
    ...numfyDefinition(definition),
  }));
  const staticState = React.useRef(definition).current;

  function set(target: keyof T, bool: boolean, timing?: "instant" | "spring") {
    staticState[target] = bool as T[keyof T];

    const next = booleanToNum(staticState[target]);
    if (timing === "instant") {
      api.set({ [target]: next })
    } else {
      api.start({
        [target]: next,
        config,
      })
    }
  }

  function toggle(target: keyof T, timing?: "instant" | "spring") {
    set(target, !staticState[target], timing)
  }

  return [spring as Record<keyof T, SpringValue<number>>, {set, toggle}, staticState] as const
}


function numfyDefinition<T extends Record<string, boolean>>(def: T) {
  const numfied = {} as Record<keyof T, number>;
  Object.entries(def).forEach(([key, bool]) => {
    numfied[key as keyof T] = booleanToNum(bool);
  });
  return numfied;
}

function booleanToNum(bool: boolean) {
  return bool ? 1 : 0;
}