import React, { useRef } from 'react'
import { Input, Popover } from 'antd'
import { SketchPicker } from 'react-color'
import './styles.less'
import { usePrefix } from '../../../designable-react'

export interface IColorInputProps {
  value?: string
  onChange?: (color: string) => void
}

export const ColorInput: React.FC<IColorInputProps> = (props) => {
  const container = useRef<HTMLDivElement>()
  const prefix = usePrefix('color-input')
  const color = props.value as string
  return (
    <div ref={container as any} className={prefix}>
      <Input
        value={props.value}
        onChange={(e) => {
          props.onChange?.(e.target.value)
        }}
        placeholder="Color"
        prefix={
          <Popover
            autoAdjustOverflow
            trigger="click"
            overlayInnerStyle={{ padding: 0 }}
            getPopupContainer={() => container.current as any}
            content={
              <SketchPicker
                color={color}
                onChange={({ rgb }: any) => {
                  props.onChange?.(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`)
                }}
              />
            }
          >
            <div
              className={prefix + '-color-tips'}
              style={{
                backgroundColor: color,
              }}
            ></div>
          </Popover>
        }
      />
    </div>
  )
}
