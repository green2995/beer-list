import React from 'react'
import { animated, SpringConfig } from "react-spring"
import chroma from "chroma-js"
import styled from 'styled-components'

import { ToggleTiming, useToggleSpring } from '../../Hooks/useToggleSpring'
import { AnimatedStyle } from '../../Types/react-spring'

const SPRING_CONFIG: SpringConfig = {
  tension: 300,
  bounce: 0,
}

const ToggleButton = React.forwardRef<ToggleButton, ToggleButtonProps>((
  props,
  ref
) => {
  const { toggled, onToggle, style, children, toggledColor } = props;
  const [toggleSpring, toggleApi, staticState] = useToggleSpring({
    toggled: !!toggled,
  }, SPRING_CONFIG)

  const colorFrom = props.defaultColor || "rgba(255,255,255,0)";
  const colorTo = toggledColor || "dodgerblue";
  
  function onClick() {
    toggleApi.toggle("toggled");
    onToggle?.call(null, staticState.toggled);

  }

  const backgroundColor = toggleSpring.toggled.to((v) => {
    return chroma.mix(colorFrom, colorTo, v).hex();
  })

  function set(toggled: boolean, timing?: ToggleTiming) {
    toggleApi.set("toggled", toggled, timing);
  }

  function toggle(timing?: ToggleTiming) {
    toggleApi.toggle("toggled", timing);
  }

  React.useEffect(() => {
    set(!!toggled);
  }, [toggled])

  React.useImperativeHandle(ref, () => {
    return {
      toggle,
      set
    }
  })

  return (
    <Container onClick={onClick} style={{ ...style, backgroundColor }}>
      {children}
    </Container>
  )
})

const Container = styled(animated.div)`
  cursor: pointer;
  user-select: none;
  &:hover {
    box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.2);
  }
`;

type ToggleButtonProps = {
  toggled?: boolean;
  onToggle?: (result: boolean) => void;
  style?: AnimatedStyle<typeof animated.div>;
  children?: React.ReactNode;
  defaultColor?: React.CSSProperties["backgroundColor"]
  toggledColor?: React.CSSProperties["backgroundColor"]
}

type ToggleButton = {
  set(toggled: boolean, timing?: ToggleTiming): void
  toggle(timing?: ToggleTiming): void
}

export default ToggleButton
