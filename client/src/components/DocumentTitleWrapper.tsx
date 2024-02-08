import { PropsWithChildren, useEffect } from 'react'

type Props = {
  pageTitle: string
}

const DocumentTitleWrapper = (props: Props & PropsWithChildren) => {
  useEffect(() => {
    document.title = props.pageTitle
  }, [props])

  return props.children
}

export default DocumentTitleWrapper
