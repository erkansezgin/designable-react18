import { TreeNode, Engine } from '@designable/core'

export type ComponentNameMatcher =
  | string
  | string[]
  | ((name: string, node: TreeNode | undefined, context?: any) => boolean)

export const matchComponent = (
  node: TreeNode | undefined | null,
  name: ComponentNameMatcher,
  context?: any
) => {
  if (name === '*') return true
  const componentName = node?.props?.['x-component']
  if (typeof name === 'function')
    return name(componentName || '', node, context)
  if (Array.isArray(name)) return name.includes(componentName)
  return componentName === name
}

export const matchChildComponent = (
  node: TreeNode,
  name: ComponentNameMatcher,
  context?: any
) => {
  if (name === '*') return true
  const componentName = node?.props?.['x-component']
  if (!componentName) return false
  if (typeof name === 'function')
    return name(componentName || '', node, context)
  if (Array.isArray(name)) return name.includes(componentName)
  return componentName.indexOf(`${name}.`) > -1
}

export const includesComponent = (
  node: TreeNode,
  names: ComponentNameMatcher[],
  target?: TreeNode
) => {
  return names.some((name) => matchComponent(node, name, target))
}

export const queryNodesByComponentPath = (
  node: TreeNode | undefined,
  path: ComponentNameMatcher[]
): TreeNode[] => {
  if (path?.length === 0) return []
  if (path?.length === 1) {
    if (node && matchComponent(node, path[0])) {
      return [node]
    }
  }
  return matchComponent(node, path[0])
    ? node?.children.reduce((buf, child) => {
      return buf.concat(queryNodesByComponentPath(child, path.slice(1)) as any)
    }, [])
    : [] as any
}

export const findNodeByComponentPath = (
  node: TreeNode | undefined | null,
  path: ComponentNameMatcher[]
): TreeNode | undefined | null => {
  if (path?.length === 0) return
  if (path?.length === 1) {
    if (matchComponent(node, path[0])) {
      return node
    }
  }
  if (matchComponent(node, path[0])) {
    for (let i = 0; i < (node?.children?.length || 0); i++) {
      const next = findNodeByComponentPath(node?.children[i], path.slice(1))
      if (next) {
        return next
      }
    }
  }
}

export const hasNodeByComponentPath = (
  node: TreeNode | undefined,
  path: ComponentNameMatcher[]
) => !!findNodeByComponentPath(node, path)

export const matchArrayItemsNode = (node: TreeNode) => {
  return (
    node?.parent?.props?.type === 'array' &&
    node?.parent?.children?.[0] === node
  )
}

export const createNodeId = (designer: Engine, id: string) => {
  return {
    [designer.props.nodeIdAttrName as any]: id,
  }
}

export const createEnsureTypeItemsNode = (type: string) => (node?: TreeNode | undefined | null) => {
  const objectNode = node?.children.find((child) => child.props?.['type'] === type)
  if (objectNode) {
    return objectNode
  } else {
    const newObjectNode = new TreeNode({
      componentName: 'Field',
      props: {
        type,
      },
    })
    node?.prepend(newObjectNode)
    return newObjectNode
  }
}
