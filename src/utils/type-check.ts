export const isFunction = (value: unknown) => {
  return !!(value && Object.prototype.toString.call(value) === '[object Function]');
};
