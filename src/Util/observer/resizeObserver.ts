import { StyleObserver } from "./styleObserver";

export class CustomResizeObserver{
  observers: StyleObserver[] = []
  constructor() {}

  observe(el: Element, callback: (rect: ClientRect) => void) {
    const observer = new StyleObserver();

    let prevRect: ClientRect | undefined;
    const disconnect = observer.observe(el, () => {
      const rect = el.getBoundingClientRect();
      if (prevRect === undefined) {
        callback(rect);
        prevRect = rect;
      } else if (!CustomResizeObserver.isIdenticalRect(prevRect, rect)) {
        callback(rect);
        prevRect = rect;
      }
    })

    return disconnect;
  }

  disconnect() {
    this.observers.forEach((ob) => ob.disconnect());
  }

  static isIdenticalRect(rect1: ClientRect, rect2: ClientRect) {
    for (const key in rect1) {
      const asserted = key as keyof ClientRect;
      if (rect2[asserted] !== rect1[asserted]) return false;
    }

    return true;
  }
}