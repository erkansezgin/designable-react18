import { globalThisPolyfill } from '../../shared'
import { getNpmCDNRegistry } from '../registry'
export interface ILoadScriptProps {
  package: string
  entry: string
  root: string
  base?: string
}

export const loadScript = async (props: ILoadScriptProps) => {
  const options: ILoadScriptProps = {
    base: getNpmCDNRegistry(),
    ...props,
  }
  if (globalThisPolyfill[props.root as any]) return globalThisPolyfill[options.root as any]
  const path = `${options.base}/${options.package}/${options.entry}`
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = false
    script.src = path
    script.onload = () => {
      const module = globalThisPolyfill[options.root as any]
      globalThisPolyfill['define' as any] = define
      resolve(module)
      script.remove()
    }
    script.onerror = (err) => {
      reject(err)
    }
    const define = globalThisPolyfill['define' as any]
    globalThisPolyfill['define' as any] = undefined as any
    document.body.appendChild(script)
  })
}
