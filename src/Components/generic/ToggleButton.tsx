import React from 'react'
import { animated, SpringConfig } from "react-spring"
import { useGesture } from 'react-use-gesture'

import chroma from "chroma-js"
import styled from 'styled-components'

import { useToggleSpring } from '../../Hooks/useToggleSpring'
import { AnimatedStyle } from '../../Types/react-spring'

const SPRING_CONFIG: SpringConfig = {
  tension: 300,
  bounce: 0,
}

const ToggleButton = (props: ToggleButtonProps) => {
  const { toggled, onToggle, style, children, toggledColor } = props;
  const [toggleSpring, toggleApi, staticState] = useToggleSpring({
    toggled: !!toggled,
  }, SPRING_CONFIG)

  const colorFrom = props.defaultColor || "rgba(255,255,255,0)";
  const colorTo = toggledColor || "dodgerblue";

  const bind = useGesture({
    onClick: () => {
      toggleApi.toggle("toggled");
      onToggle?.call(null, staticState.toggled);
    }
  })

  const backgroundColor = toggleSpring.toggled.to((v) => {
    return chroma.mix(colorFrom, colorTo, v).hex();
  })

  React.useEffect(() => {
    toggleApi.set("toggled", !!toggled);
  }, [toggled])

  return (
    <Container style={{ ...style, backgroundColor }} {...bind()}>
      {children}
    </Container>
  )
}

const Container = styled(animated.div)`
  cursor: pointer;
  user-select: none;
`;

type ToggleButtonProps = {
  toggled?: boolean;
  onToggle?: (result: boolean) => void;
  style?: AnimatedStyle<typeof animated.div>;
  children?: React.ReactNode;
  defaultColor?: React.CSSProperties["backgroundColor"]
  toggledColor?: React.CSSProperties["backgroundColor"]
}

export default ToggleButton
