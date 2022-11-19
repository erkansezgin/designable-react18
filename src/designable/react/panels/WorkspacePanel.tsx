import React from 'react'
import { usePrefix } from '../hooks'

export interface IWorkspaceItemProps {
  style?: React.CSSProperties
  flexable?: boolean,
  children?: React.ReactNode,
}

const WorkspacePanelInner: React.FC & {
  Item?: React.FC<IWorkspaceItemProps>
} = (props: any) => {
  const prefix = usePrefix('workspace-panel')
  return <div className={prefix}>{props.children}</div>
}

WorkspacePanelInner.Item = (props) => {
  const prefix = usePrefix('workspace-panel-item')
  return (
    <div
      className={prefix}
      style={{
        ...props.style,
        flexGrow: props.flexable ? 1 : 0,
        flexShrink: props.flexable ? 1 : 0,
      }}
    >
      {props.children}
    </div>
  )
}

export const WorkspacePanel = WorkspacePanelInner as React.FC<{ children?: React.ReactNode }> & {
  Item: React.FC<IWorkspaceItemProps>,
}
