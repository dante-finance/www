import { useRef } from 'react';

let uniqueId = 0;
const getUniqueId = () => uniqueId++;

/**
 * Hooks that can be used to generate unique ID.
 * Useful for creating ids to avoid clash when multiple instance of a component
 * are mounted in the page
 */
export function useComponentId(): string {
  const idRef = useRef<string | null>(null);
  if (idRef.current === null) {
    idRef.current = `rrid-${getUniqueId()}`;
  }
  return idRef.current;
}
