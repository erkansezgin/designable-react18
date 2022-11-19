import { useContext } from 'react'
import { DesignerLayoutContext } from '../context'
import { IDesignerLayoutContext } from '../types'
import { globalThisPolyfill } from '@designable/shared'

export const useLayout = (): IDesignerLayoutContext => {
  const context = useContext(DesignerLayoutContext)
  return (
    (globalThisPolyfill as any)['__DESIGNABLE_LAYOUT__'] ||
    context
  )
}
