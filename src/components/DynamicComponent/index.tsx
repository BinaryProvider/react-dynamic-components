import React, { Suspense, useMemo } from 'react'
import { IDynamicComponent } from '../../hooks/useEditorContext'
import ErrorBoundary from '../ErrorBoundary'

export const DynamicComponent: React.FC<IDynamicComponent> = ({
  packageIdentifier,
  componentName,
  namedExport,
  ...props
}) => {
  const Component = useMemo(
    () =>
      packageIdentifier && componentName
        ? React.lazy(() =>
            import(
              /* webpackIgnore: true */
              `https://cdn.jsdelivr.net/npm/${packageIdentifier.trim()}/+esm`
            ).then((module) => {
              console.log('Loaded module:', module)
              return namedExport
                ? {
                    default:
                      module?.[componentName.trim()] ??
                      module?.default?.[componentName.trim()],
                  }
                : {
                    default: module?.default,
                  }
            })
          )
        : () => null,
    [packageIdentifier, componentName, namedExport]
  )

  const key = `${packageIdentifier}/${componentName}/${namedExport}/${JSON.stringify(
    props
  )}`

  return (
    <ErrorBoundary key={key}>
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  )
}
