import { repeatUntil } from "./repeatUntil";

export function waitFullLoad(callback: () => void, interval = 100) {
  let prevEntriesCount = -1;
  return repeatUntil(() => {
    const performanceEntries = performance.getEntries();
    if (performanceEntries.length !== prevEntriesCount) {
      prevEntriesCount = performanceEntries.length;
      return false;
    } else {
      callback();
      return true;
    }
  }, interval)
}