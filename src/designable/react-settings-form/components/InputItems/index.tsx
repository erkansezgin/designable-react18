import React, { ReactNode, useContext } from 'react'
import cls from 'classnames'
import './styles.less'
import { usePrefix, IconWidget } from '../../../react'

export interface IInputItemsContext {
  width?: string | number
  vertical?: boolean
}

export interface IInputItemsProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  width?: string | number
  vertical?: boolean
}

export interface IInputItemProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  icon?: React.ReactNode
  width?: string | number
  vertical?: boolean
  title?: React.ReactNode
}

const InputItemsContext = React.createContext<IInputItemsContext|null>(null)

export const InputItems: React.FC<IInputItemsProps> & {
  Item: React.FC<IInputItemProps>
} = (props) => {
  const prefix = usePrefix('input-items')
  return (
    <InputItemsContext.Provider value={props}>
      <div className={cls(prefix, props.className)} style={props.style}>
        {props.children}
      </div>
    </InputItemsContext.Provider>
  )
}

InputItems.defaultProps = {
  width: '100%',
}

const Item = (props:any) => {
  const prefix = usePrefix('input-items-item')
  const ctx = useContext(InputItemsContext)
  return (
    <div
      className={cls(prefix, props.className, {
        vertical: props.vertical || ctx?.vertical,
      })}
      style={{ width: props.width || ctx?.width, ...props.style }}
    >
      {props.icon && (
        <div className={prefix + '-icon'}>
          <IconWidget infer={props.icon} size={16} />
        </div>
      )}
      {props.title && <div className={prefix + '-title'}>{props.title}</div>}
      <div className={prefix + '-controller'}>{props.children}</div>
    </div>
  )
}

InputItems.Item = Item