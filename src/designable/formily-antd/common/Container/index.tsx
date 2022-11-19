import React from 'react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { DroppableWidget } from '../../../react'

export const Container: React.FC<any> = observer((props) => {
  return <DroppableWidget>{props.children}</DroppableWidget>
})

export const withContainer = (Target: React.JSXElementConstructor<any>) => {
  return (props: any) => {
    return (
      <DroppableWidget>
        <Target {...props} />
      </DroppableWidget>
    )
  }
}
