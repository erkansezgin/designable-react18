import { useContext, useEffect } from 'react'
import { Engine } from '@designable/core'
import { DesignerEngineContext } from '../context'
import { isFn, globalThisPolyfill } from '@designable/shared'
export interface IEffects {
  (engine: Engine): void
}

export const useDesigner = (effects?: IEffects): Engine => {
  const context = useContext(DesignerEngineContext)
  const designer: Engine =
    (globalThisPolyfill as any)['__DESIGNABLE_ENGINE__'] || context
  useEffect(() => {
    if (isFn(effects)) {
      return effects(designer)
    }
  }, [])
  return designer
}
