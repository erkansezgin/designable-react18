import { Engine } from '@designable/core'
import { message } from 'antd'
import { transformToSchema, transformToTreeNode } from '../../designable/formily-antd/transformer'

export const saveSchema = (designer: Engine) => {
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(transformToSchema(designer.getCurrentTree()))
  )
  message.success('Save Success')
}

export const loadInitialSchema = (designer: Engine) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(JSON.parse(localStorage.getItem('formily-schema') as any))
    )
  } catch {}
}
