export function repeatUntil(callback: () => boolean, interval = 100) {
  let timeoutID: NodeJS.Timeout;
  
  function tick() {
    const result = callback();
    if (result === true) {
    } else {
      timeoutID = setTimeout(tick, interval);
    }
  }

  tick();

  function cancel() {
    clearTimeout(timeoutID);
  }

  return cancel;
}