export function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export function getOwnerDocument<T extends Element>(element: T | null | undefined) {
  return canUseDOM() ? (element ? element.ownerDocument : document) : null;
}
