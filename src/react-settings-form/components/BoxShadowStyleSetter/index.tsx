import React from 'react'
import { usePrefix } from '@designable/react'
import { useField, observer } from '@formily/react'
import { FoldItemInner } from '../FoldItem'
import { ColorInput } from '../ColorInput'
import { SizeInput } from '../SizeInput'
import { InputItems } from '../InputItems'
import cls from 'classnames'

export interface IBoxShadowStyleSetterProps {
  className?: string
  style?: React.CSSProperties
  value?: string
  onChange?: (value: string) => void
}

export const BoxShadowStyleSetter: React.FC<IBoxShadowStyleSetterProps> =
  observer((props) => {
    const field = useField()
    const prefix = usePrefix('shadow-style-setter')
    const createBoxShadowConnector = (position: number) => {
      const splited = String(props.value || '')
        .trim()
        .split(' ')
      return {
        value: splited[position],
        onChange: (value: any) => {
          splited[position] = value
          props.onChange?.(
            `${splited[0] || ''} ${splited[1] || ''} ${splited[2] || ''} ${
              splited[3] || ''
            } ${splited[4] || ''}`
          )
        },
      }
    }
    return (
      <FoldItemInner
        className={cls(prefix, props.className)}
        style={props.style}
        label={field.title}
      >
        <FoldItemInner.Base>
          <ColorInput {...createBoxShadowConnector(4)} />
        </FoldItemInner.Base>
        <FoldItemInner.Extra>
          <InputItems width="50%">
            <InputItems.Item icon="AxisX">
              <SizeInput
                exclude={['inherit', 'auto']}
                {...createBoxShadowConnector(0)}
              />
            </InputItems.Item>
            <InputItems.Item icon="AxisY">
              <SizeInput
                exclude={['inherit', 'auto']}
                {...createBoxShadowConnector(1)}
              />
            </InputItems.Item>
            <InputItems.Item icon="Blur">
              <SizeInput
                exclude={['inherit', 'auto']}
                {...createBoxShadowConnector(2)}
              />
            </InputItems.Item>
            <InputItems.Item icon="Shadow">
              <SizeInput
                exclude={['inherit', 'auto']}
                {...createBoxShadowConnector(3)}
              />
            </InputItems.Item>
          </InputItems>
        </FoldItemInner.Extra>
      </FoldItemInner>
    )
  })
