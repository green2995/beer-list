import { useSprings, useTrail } from '@react-spring/core';
import { animated } from '@react-spring/web';
import React from 'react'
import { SpringConfig } from 'react-spring';

type TrailAppearProps = {
  visible?: boolean
  children?: React.ReactNode
  lineHeight: number[]
  style?: React.CSSProperties
  onFinish?: () => void
  config?: SpringConfig
}

const TrailAppear = ({config, visible, children, lineHeight, style, onFinish}: TrailAppearProps) => {
  const items = React.Children.toArray(children);
  const [springs, springsApi] = useSprings(items.length, () => ({
    opacity: 0, x: 20, height: 0
  }));

  React.useEffect(() => {
    springsApi.start((i) => {
      return {
        opacity: visible ? 1 : 0,
        x: visible ? 0 : 20,
        height: visible ? lineHeight[i] : 0,
        delay: i * 100,
        config,
        onRest: i === items.length - 1 ? onFinish?.bind(null) : undefined,
      }
    })
  }, [visible, lineHeight])

  return (
    <div style={style}>
      {springs.map(({opacity, x, height}, i) => {
        return (
          <animated.div key={i} style={{opacity}}>
            <animated.div style={{x, height, overflow: "hidden"}}>{items[i]}</animated.div>
          </animated.div>
        )
      })}      
    </div>
  )
}

export default TrailAppear
