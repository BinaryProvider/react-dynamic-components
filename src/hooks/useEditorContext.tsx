import { throttle } from 'lodash-es'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

export interface IDynamicComponent {
  packageIdentifier?: string
  componentName?: string
  namedExport?: boolean
  [key: string]: unknown
}

interface IEditorProvider {
  children: ReactNode
}

interface IEditorState {
  component?: IDynamicComponent
  setComponent: React.Dispatch<React.SetStateAction<IDynamicComponent>>
}

const EditorContext = createContext<IEditorState | undefined>(undefined)

export const EditorProvider: React.FC<IEditorProvider> = ({ children }) => {
  const [component, setComponent] = useState<IDynamicComponent>({
    packageIdentifier: 'react-loader-spinner',
    componentName: 'Audio',
    namedExport: true,
    width: 300,
    height: 300,
    color: '#ff0000',
  })

  const getIframe = () => document.getElementById('Canvas') as HTMLIFrameElement

  const postMessage = useCallback(
    (message: string, value: unknown) =>
      getIframe()?.contentWindow?.postMessage({ message, value }, '*'),
    []
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const postMessageThrottled = useCallback(
    throttle((message: string, value: unknown) => {
      postMessage(message, value)
    }, 500),
    []
  )

  const {
    packageIdentifier: packageUrl,
    componentName: name,
    namedExport: defaultExport,
    ...props
  } = component ?? {}

  useEffect(() => {
    postMessageThrottled('component', component)
  }, [packageUrl, name, props, postMessageThrottled, component])

  return (
    <EditorContext.Provider value={{ component, setComponent }}>
      {children}
    </EditorContext.Provider>
  )
}

export const useEditorContext = () => {
  const context = useContext(EditorContext)

  if (!context)
    throw new Error(
      'No EditorContext.Provider found when calling useEditorContext.'
    )

  return context
}
