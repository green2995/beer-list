import React from 'react'
import { getAbsoluteOffset } from '../../Util/layout/getAbsoluteOffset';
import { CustomResizeObserver } from '../../Util/observer/resizeObserver';


const ResizeTrackView = React.forwardRef<HTMLDivElement, ResizeTrackViewProps>((
  {onLayout, ..._props},
  ref
  ) => {
  const resizeObserver = new CustomResizeObserver();
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (divRef.current && onLayout) {
      const rect = divRef.current.getBoundingClientRect();
      const absOffset = getAbsoluteOffset(divRef.current)
      onLayout(rect, absOffset);
      resizeObserver.observe(divRef.current, (rect) => {
        const absOffset = getAbsoluteOffset(divRef.current!)
        onLayout!.call(null, rect, absOffset)
      })
    }

    return () => {
      resizeObserver.disconnect();
    }
  })

  React.useImperativeHandle(ref, () => {
    return divRef.current!
  })

  return (
    <div ref={divRef} {..._props}>
      {_props.children}
    </div>
  )
})

type ResizeTrackViewProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
> & {
  onLayout?: ResizeLayoutEvent
}

export interface ResizeLayoutEvent {
  (rect: ClientRect, absOffset: AbsoluteOffset): void
}

export type AbsoluteOffset = {
  left: number
  top: number
}

export default ResizeTrackView
