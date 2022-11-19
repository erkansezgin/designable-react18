import React, { Fragment, useEffect } from 'react'
import { useTree, usePrefix, useDesigner, useComponents } from '../../hooks'
import { TreeNodeContext, DesignerComponentsContext } from '../../context'
import { IDesignerComponents } from '../../types'
import { TreeNode, GlobalRegistry } from '@designable/core'
import { observer } from '@formily/reactive-react'
import cls from 'classnames'
import './styles.less'

export interface IComponentTreeWidgetProps {
  style?: React.CSSProperties
  className?: string
  components: IDesignerComponents
}

export interface ITreeNodeWidgetProps {
  node: TreeNode
  //children?: React.ReactNode
}

export const TreeNodeWidget: React.FC<ITreeNodeWidgetProps> = observer(
  (props: ITreeNodeWidgetProps) => {
    const designer = useDesigner(props.node?.designerProps?.effects)
    const components = useComponents()
    const node = props.node
    const renderChildren = () => {
      if (node?.designerProps?.selfRenderChildren) return []
      return node?.children?.map((child) => {
        return <TreeNodeWidget key={child.id} node={child} />
      })
    }
    const renderProps = (extendsProps: any = {}) => {
      const props = {
        ...node.designerProps?.defaultProps,
        ...extendsProps,
        ...node.props,
        ...node.designerProps?.getComponentProps?.(node),
      }
      if (node.depth === 0) {
        delete props.style
      }
      return props
    }
    
    const renderComponent = () => {
      const componentName = node.componentName
      const Component = components[componentName]
      const dataId: any = {}
      if (Component) {
        if (designer) {
          dataId[designer?.props?.nodeIdAttrName as any] = node.id
        }
        return React.createElement(
          Component,
          renderProps(dataId),
          ...renderChildren()
        )
      } else {
        if (node?.children?.length) {
          return <Fragment>{renderChildren()}</Fragment>
        }
      }
    }

    if (!node) return null
    if (node.hidden) return null
    return React.createElement(
      TreeNodeContext.Provider,
      { value: node },
      renderComponent()
    )
  }
)

export const ComponentTreeWidget: React.FC<IComponentTreeWidgetProps> =
  observer((props: IComponentTreeWidgetProps) => {
    const tree = useTree()
    const prefix = usePrefix('component-tree')
    const designer = useDesigner()
    const dataId: any = {}
    if (designer && tree) {
      dataId[designer?.props?.nodeIdAttrName as any] = tree.id
    }
    useEffect(() => {
      GlobalRegistry.registerDesignerBehaviors(props.components)
    }, [props.components])
    return (
      <div
        style={{ ...props.style, ...tree?.props?.style }}
        className={cls(prefix, props.className)}
        {...dataId}
      >
        <DesignerComponentsContext.Provider value={props.components}>
          <TreeNodeWidget node={tree} />
        </DesignerComponentsContext.Provider>
      </div>
    )
  })

ComponentTreeWidget.displayName = 'ComponentTreeWidget'
