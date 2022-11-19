import { isStr, isFn } from './types'
import { globalThisPolyfill } from './globalThisPolyfill'
export const instOf = (value: any, cls: any) => {
  if (isFn(cls)) return value instanceof cls
  if (isStr(cls))
    return globalThisPolyfill[cls as any]
      ? value instanceof (globalThisPolyfill[cls as any] as any)
      : false
  return false
}
