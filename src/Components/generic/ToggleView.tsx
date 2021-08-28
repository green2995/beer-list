import React from 'react'
import { animated, AnimatedComponent } from '@react-spring/web'
import { ToggleTiming, useToggleSpring } from '../../Hooks/useToggleSpring'

type ToggleViewProps = Parameters<AnimatedComponent<"div">>[0] & {
  visible?: boolean
}

type ToggleView = {
  setVisible(visible: boolean, timing?: ToggleTiming): void
  getVisible: () => boolean
  toggle(timing?: ToggleTiming): void
  div: React.RefObject<HTMLDivElement>
}

const ToggleView = React.forwardRef<ToggleView, ToggleViewProps>((
  props,
  ref
) => {
  const { style, visible, ..._props } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  const [toggleSpring, toggleApi, staticState] = useToggleSpring({
    visible: !!visible,
  })

  function setVisible(visible: boolean, timing?: ToggleTiming) {
    toggleApi.set("visible", visible, timing);
  }

  function toggle(timing?: ToggleTiming) {
    toggleApi.toggle("visible", timing);
  }

  React.useEffect(() => {
    setVisible(!!props.visible)
  }, [props.visible])

  React.useImperativeHandle(ref, () => {
    return {
      setVisible,
      getVisible: () => staticState.visible,
      toggle,
      div: divRef
    }
  })

  const opacity = toggleSpring.visible;
  const zIndex = toggleSpring.visible.to((v) => Math.round(v) === 0 ? -100 : 10);

  return (
    <animated.div
      ref={divRef}
      {..._props}
      style={{
        ...style,
        opacity,
        zIndex,
      }}
    />
  )
})

export default ToggleView
