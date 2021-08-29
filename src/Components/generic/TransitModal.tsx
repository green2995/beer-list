import React from 'react'
import { Interpolation, useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { getAbsoluteOffset } from '../../Util/layout/getAbsoluteOffset';
import { useCurrent } from '../../Hooks/useCurrent';
import { AnimatedStyle } from '../../Types/react-spring';
import { CustomResizeObserver } from '../../Util/observer/resizeObserver';

const TransitModal = (props: TransitModalProps) => {
  const { open } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  const refState = useCurrent({
    recoveringPosition: false,
    opening: false,
    open: false,
    hasOpened: false,
    rect: {
      left: -1,
      right: -1,
      top: -1,
      bottom: -1,
      width: -1,
      height: -1,
    }
  })

  const [spring, api] = useSpring(() => ({
    position: open ? "fixed" as const : "relative" as const,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    zIndex: 0,
  }))

  const resizeObserver = useCurrent(new CustomResizeObserver());

  function onScroll() {
    if (refState.recoveringPosition) {
      api.start({
        to: async (next) => {
          const el$ = ref.current as HTMLDivElement;

          await next({
            x: -window.scrollX,
            y: -window.scrollY,
            config: {
              tension: 600,
              bounce: 0,
            },
          });

          await next({
            position: "relative",
            zIndex: 0,
            x: 0,
            y: 0,
            immediate: true,
            onResolve: () => {
              refState.recoveringPosition = false;
            }
          });

        }
      })
    }
  }

  function onWindowResize() {
    if (!ref.current) return;
    const { innerHeight, innerWidth } = window;
    const { left: absX, top: absY } = getAbsoluteOffset(ref.current);

    if (refState.open && refState.opening) {
      api.start({
        to: async (next) => {
          await next({
            width: innerWidth,
            height: innerHeight,
            x: -absX,
            y: -absY,
            onResolve: () => {
              refState.opening = false;
            }
          });
        }
      })
    } else if (refState.open && !refState.opening) {
      api.set({
        width: innerWidth,
        height: innerHeight,
        x: -absX,
        y: -absY,
      })
    }
  }

  function updateRect(rect?: ClientRect) {
    if (!ref.current) return;
    if (rect) {
      refState.rect = rect;
    } else {
      const _rect = ref.current.getBoundingClientRect();
      refState.rect = _rect;
    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("scroll", onScroll);

    if (ref.current) {
      updateRect();
      resizeObserver.observe(ref.current, (rect) => {
        if (
          !refState.open
          && !refState.recoveringPosition
          && rect.width > 0
          && rect.height > 0
        ) {
          updateRect(rect);
        }
      });
    }

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    }
  }, [])

  React.useEffect(() => {
    refState.open = !!open;

    api.start({
      to: async (next) => {
        if (!refState.hasOpened) {
          refState.hasOpened = true;
          return;
        }

        if (!ref.current) return;
        const { innerHeight, innerWidth } = window;
        const { left: absX, top: absY } = getAbsoluteOffset(ref.current);

        if (open) {
          refState.opening = true;
          await next({
            position: "fixed",
            zIndex: 10,
            x: -window.scrollX,
            y: -window.scrollY,
            immediate: true,
          });

          await next({
            width: innerWidth,
            height: innerHeight,
            x: -absX,
            y: -absY,
            config: { tension: 200 },
            onResolve: () => {
              refState.opening = false;
            }
          });

        } else {

          refState.recoveringPosition = true;
          await next({
            width: refState.rect.width,
            height: refState.rect.height,
            x: -window.scrollX,
            y: -window.scrollY,
          });

          await next({
            position: "relative",
            zIndex: 0,
            x: 0,
            y: 0,
            immediate: true,
            onResolve: () => {
              refState.recoveringPosition = false;
            }
          });
        }
      }
    })
  }, [open])

  const width = spring.width.to((val) => {
    if (refState.rect.width === -1) return props.style?.width || "auto";
    if (!refState.hasOpened) return props.style?.width || "auto";
    return val;
  }) as Interpolation<number | string>

  const height = spring.height.to((val) => {
    if (refState.rect.height === -1) return props.style?.height || "auto";
    if (!refState.hasOpened) return props.style?.height || "auto";
    return val;
  }) as Interpolation<number | string>

  const {
    // __width and __height is not used
    width: __width,
    height: __height,
    ..._spring
  } = spring;

  return (
    <animated.div
      ref={ref}
      style={{
        ...props.style,
        ..._spring,
        width,
        height,
      }}>
      {props.children}
    </animated.div>
  )
}

type TransitModalProps = {
  children?: React.ReactNode
  style?: AnimatedStyle<typeof animated.div>
  open?: boolean
}

export default TransitModal
