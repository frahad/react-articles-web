import React from 'react'
import { Cell } from '@material/react-layout-grid'
import LoadingSkeleton from 'react-loading-skeleton'

const Articles = () => {
  // Defines the default shape for article container.
  const LoadingContainer = () => (
    <LoadingSkeleton width="100%" height={400} />
  )

  return (
    <>
      <Cell desktopColumns={6} tabletColumns={6}>
        <LoadingContainer />
      </Cell>

      <Cell desktopColumns={6} tabletColumns={6}>
        <LoadingContainer />
      </Cell>

      <Cell columns={12}>
        <LoadingContainer />
      </Cell>
    </>
  )
}

export default {
  Articles,
}
