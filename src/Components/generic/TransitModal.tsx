import React from 'react'
import { Interpolation, useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { getAbsoluteOffset } from '../../Util/layout/getAbsoluteOffset';
import { useCurrent } from '../../Hooks/useCurrent';
import { AnimatedStyle } from '../../Types/react-spring';
import { CustomResizeObserver } from '../../Util/observer/resizeObserver';
import ResizeTrackView, { AbsoluteOffset } from './ResizeTrackView';

const AnimatedResizeTrackView = animated(ResizeTrackView);

const TransitModal = (props: TransitModalProps) => {
  const { open, style, ..._props } = props;

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

  function onScroll() {
    if (!refState.recoveringPosition) return;
    api.start({
      to: async (next) => {
        await next({
          x: -window.scrollX,
          y: -window.scrollY,
          config: {
            tension: 2000,
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

  function onWindowResize() {
    if (!ref.current) return;
    if (!refState.open) return;
    const { innerHeight, innerWidth } = window;
    const { left: absX, top: absY } = getAbsoluteOffset(ref.current);

    api.start({
      to: async (next) => {
        await next({
          width: innerWidth,
          height: innerHeight,
          x: -absX,
          y: -absY,
          onResolve: () => {
            if (refState.opening) {
              refState.opening = false;
            }
          },
          immediate: refState.opening === false,
        });
      }
    })

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

  function onLayout(rect: ClientRect) {
    if (refState.open) return;
    if (refState.recoveringPosition) return;
    updateRect(rect);
  }

  React.useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("scroll", onScroll);
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
          await next({
            width: refState.rect.width,
            height: refState.rect.height,
            immediate: true,
          })
          
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
    return val || refState.rect.width;
  }) as Interpolation<number | string>

  const height = spring.height.to((val) => {
    if (refState.rect.height === -1) return props.style?.height || "auto";
    return val || refState.rect.height;
  }) as Interpolation<number | string>

  const {
    // __width and __height is not used
    width: __width,
    height: __height,
    ..._spring
  } = spring;

  return (
    <AnimatedResizeTrackView
      {..._props}
      onLayout={onLayout}
      ref={ref}
      style={{
        ...style,
        ..._spring,
        width,
        height,
      }}>
      {props.children}
    </AnimatedResizeTrackView>
  )
}

type TransitModalProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "style" | "ref"
> & {
  style?: AnimatedStyle<typeof animated.div>
  open?: boolean
}

export default TransitModal
