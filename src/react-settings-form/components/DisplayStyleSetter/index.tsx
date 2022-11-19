import React from 'react'
import { useField, Field, observer } from '@formily/react'
import { Field as FieldType } from '@formily/core'
import { FormItem as FormItemFormily } from '@formily/antd'
import { Radio } from 'antd'
import { FlexStyleSetter } from '../FlexStyleSetter'
import cls from 'classnames'
import './styles.less'
import { IconWidget, usePrefix } from '../../../designable-react'
export interface IDisplayStyleSetterProps {
  className?: string
  style?: React.CSSProperties
  value?: string
  onChange?: (value: string) => void
}

export const DisplayStyleSetter: React.FC<IDisplayStyleSetterProps> = observer(
  (props) => {
    const field = useField<FieldType>()
    const prefix = usePrefix('display-style-setter')
    const FormItem = FormItemFormily as any;
    return (
      <>
        <FormItem.BaseItem
          label={field.title}
          className={cls(prefix, props.className)}
          style={props.style}
        >
          <Radio.Group
            className={prefix + '-radio'}
            options={[
              {
                label: <IconWidget infer="DisplayBlock" size={16} />,
                value: 'block',
              },
              {
                label: <IconWidget infer="DisplayInlineBlock" size={16} />,
                value: 'inline-block',
              },
              {
                label: <IconWidget infer="DisplayInline" size={16} />,
                value: 'inline',
              },
              {
                label: <IconWidget infer="DisplayFlex" size={16} />,
                value: 'flex',
              },
            ]}
            value={props.value}
            onChange={(e) => {
              props.onChange?.(e.target.value)
            }}
            optionType="button"
          />
        </FormItem.BaseItem>
        <Field
          name="flex"
          basePath={field.address.parent()}
          visible={false}
          reactions={(flexField) => {
            flexField.visible = field.value === 'flex'
          }}
          component={[FlexStyleSetter]}
        />
      </>
    )
  }
)
