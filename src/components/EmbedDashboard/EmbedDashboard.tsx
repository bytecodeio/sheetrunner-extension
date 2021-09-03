import { LookerEmbedDashboard, LookerEmbedSDK } from '@looker/embed-sdk'
import {
  ExtensionContext,
  ExtensionContextData,
} from '@looker/extension-sdk-react'
import React, { FC, useCallback, useContext, useState } from 'react'
import { EmbedContainer } from '../../styles'

export const EmbedDashboard: FC<{ id?: string | number }> = ({ id }) => {
  if (!id) return <></>

  const [dashboard, setDashboard] = useState<LookerEmbedDashboard>()
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)

  const setupDashboard = (dashboard: LookerEmbedDashboard) => {
    setDashboard(dashboard)
    dashboard.run()
  }

  const embedCtrRef = useCallback(
    (el) => {
      const hostUrl = extensionContext?.extensionSDK?.lookerHostData?.hostUrl
      if (el && hostUrl) {
        el.innerHTML = ''
        LookerEmbedSDK.init(hostUrl)
        LookerEmbedSDK.createDashboardWithId(id as number)
          .withNext()
          .appendTo(el)
          .build()
          .connect()
          .then(setupDashboard)
          .catch((error: Error) => {
            console.error('Connection error', error)
          })
      }
    },
    [id]
  )

  return (
    <>
      <EmbedContainer ref={embedCtrRef} />
    </>
  )
}
