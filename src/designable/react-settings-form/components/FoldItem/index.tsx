import React, { Fragment, useRef, useMemo } from 'react'
import { FormItem, IFormItemProps } from '@formily/antd'
import { useField, observer } from '@formily/react'
import { observable } from '@formily/reactive'
import cls from 'classnames'
import './styles.less'
import { usePrefix, IconWidget } from '../../../react'

const ExpandedMap = new Map<string, boolean>()

const FoldItemInner: React.FC<IFormItemProps &
{
  children?: React.ReactNode,
  className?: string,
}> & {
  Base?: React.FC<any>
  Extra?: React.FC,
} = observer(({ className, style, children, ...other }) => {
  const prefix = usePrefix('fold-item')
  const field = useField()
  const expand = useMemo(
    () => observable.ref(ExpandedMap.get(field.address.toString())),
    []
  )
  const slots = useRef({ base: null, extra: null })
  React.Children.forEach(children, (node) => {
    if (React.isValidElement(node)) {
      if ((node as any)?.['type']?.['displayName'] === 'FoldItem.Base') {
        slots.current.base = node['props'].children
      }
      if ((node as any)?.['type']?.['displayName'] === 'FoldItem.Extra') {
        slots.current.extra = node['props'].children
      }
    }
  })

  const FormItemBaseItem = FormItem.BaseItem as any
  return (
    <div className={cls(prefix, className)}>
      <div
        className={prefix + '-base'}
        onClick={() => {
          expand.value = !expand.value
          ExpandedMap.set(field.address.toString(), expand.value)
        }}
      >
        <FormItemBaseItem
          {...other}
          label={
            <span
              className={cls(prefix + '-title', {
                expand: expand.value,
              })}
            >
              {slots.current.extra && <IconWidget infer="Expand" size={10} />}
              {(other as any).label}
            </span>
          }
        >
          <div
            style={{ width: '100%' }}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {slots.current.base}
          </div>
        </FormItemBaseItem>
      </div>
      {expand.value && slots.current.extra && (
        <div className={prefix + '-extra'}>{slots.current.extra}</div>
      )}
    </div>
  )
})

const Base: React.FC = () => {
  return <Fragment />
}

Base.displayName = 'FoldItem.Base'

const Extra: React.FC = () => {
  return <Fragment />
}

Extra.displayName = 'FoldItem.Extra'

FoldItemInner.Base = Base
FoldItemInner.Extra = Extra

export const FoldItem = FoldItemInner as React.FC<IFormItemProps &
{
  children?: React.ReactNode,
  className?: string,
}> & {
  Base: React.FC<any>
  Extra: React.FC<any>,
}
