// Inspired by `react-window`

const hasNativePerformanceNow =
  typeof performance === 'object' && typeof performance.now === 'function';

const now = hasNativePerformanceNow
  ? () => performance.now()
  : () => Date.now();

/**
 * @param id `由requestTimeout`返回的对象中的id属性
 */
export function cancelTimeout(id: number) {
  cancelAnimationFrame(id);
}

/**
 * @param cb timeout的回调
 * @param delay 延迟
 * @returns 包含timeoutId与cancel方法的对象
 */
export function requestTimeout(cb: Function, delay: number = 150) {
  const start = now();
  // eslint-disable-next-line no-use-before-define
  let timeoutId = requestAnimationFrame(tick);
  const timeouter = {
    id: timeoutId,
    cancel: cancelTimeout.bind(null, timeoutId),
  };

  function tick() {
    if (now() - start >= delay) {
      cb();
    } else {
      timeoutId = requestAnimationFrame(tick);
      timeouter.cancel = cancelTimeout.bind(null, timeoutId);
    }
  }

  return timeouter;
}
