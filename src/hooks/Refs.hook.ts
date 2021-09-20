import { useRef } from "react";

export function useRefs<T>(refs: T) {
  const ref = useRef(refs)
  Object.assign(ref.current, refs)
  return ref.current
}
