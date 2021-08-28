import { animated, AnimatedComponent } from "@react-spring/web";

export type AnimatedStyle<T extends AnimatedComponent> = Parameters<T>[0]["style"]