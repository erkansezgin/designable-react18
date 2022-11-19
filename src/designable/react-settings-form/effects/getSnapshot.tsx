import { Operation } from '@designable/core'
import { onFieldInputValueChange } from '@formily/core'

let timeRequest:any = null

export const getSnapshot = (operation: Operation) => {
  onFieldInputValueChange('*', () => {
    clearTimeout(timeRequest)
    timeRequest = setTimeout(() => {
      operation.snapshot('update:node:props')
    }, 1000)
  })
}
