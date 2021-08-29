export class StyleObserver {
  observers: MutationObserver[] = []

  constructor() {}

  observe(el: Element, callback: (style: CSSStyleDeclaration) => void) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          if (mutation.attributeName === "style") {
            callback(window.getComputedStyle(el));
          }
        }
      })
    })

    observer.observe(el, {
      attributes: true,
    });
    this.observers.push(observer);

    return observer.disconnect;
  }

  disconnect() {
    this.observers.forEach((ob) => ob.disconnect());
  }
}