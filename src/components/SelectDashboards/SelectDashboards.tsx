import {
  Box,
  Button,
  FieldSelect,
  FieldText,
  FieldToggleSwitch,
  Flex,
  FlexItem,
  Form,
  Heading,
  IconButton,
  MessageBar,
  SpaceVertical,
  Spinner,
} from '@looker/components'
import {
  ExtensionContext,
  ExtensionContextData,
} from '@looker/extension-sdk-react'
import { IDashboard, IDashboardBase, IFolder } from '@looker/sdk/lib/4.0/models'
import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { SelectDashboardsConfig } from '../../types'
import { EmbedDashboard } from '../EmbedDashboard'
import { SelectDashboardsProps } from './types'

const apiUrl = process.env.API_ENDPOINT;
const apiKey = process.env.API_KEY;
export const SelectDashboards: React.FC<SelectDashboardsProps> = () => {
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.core40SDK
  const [
    dashboardsConfig,
    updateDashboardsConfig,
  ] = useState<SelectDashboardsConfig>()
  const [baseId, setBaseId] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [targetId, setTargetId] = useState('')
  const [lastDashboardId, setLastDashboardtId] = useState('')
  const [lastDashboardtype, setLastDashboardtType] = useState('')
  const [createNewTarget, updateCreateNewTarget] = useState(false)
  const [baseOptions, updateBaseOptions] = useState([])
  const [customerOptions, updateCustomerOptions] = useState([])
  const [targetOptions, updateTargetOptions] = useState([])
  const [folderOptions, updateFolderOptions] = useState([])
  const [loading, updateLoading] = useState(false)
  const [error, updateError] = useState<any>()
  const [success, updateSuccess] = useState(false)
  const [validationMessages] = useState()

  const handleBaseChange = (base: string) => {
    updateDashboardsConfig({ ...dashboardsConfig, base })
    setBaseId(base)
    setLastDashboardtId(base)
    setLastDashboardtType('Base Dashboard')
  }
  const handleBaseRefresh = () => {
    setLastDashboardtId(baseId)
    setLastDashboardtType('Base Dashboard')
  }
  const handleCustomerChange = (customer: string) => {
    updateDashboardsConfig({ ...dashboardsConfig, customer })
    setCustomerId(customer)
    setLastDashboardtId(customer)
    setLastDashboardtType('Customer Dashboard')
  }
  const handleCustomerRefresh = () => {
    setLastDashboardtId(customerId)
    setLastDashboardtType('Customer Dashboard')
  }
  const handleTargetChange = (target: string) => {
    updateDashboardsConfig({ ...dashboardsConfig, target })
    setTargetId(target)
    setLastDashboardtId(target)
    setLastDashboardtType('Target Dashboard')
  }
  const handleTargetRefresh = () => {
    setLastDashboardtId(targetId)
    setLastDashboardtType('Target Dashboard')
  }
  const handleFolderChange = (folder: string) => {
    updateDashboardsConfig({ ...dashboardsConfig, folder })
  }
  const handleNewDashboardNameChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    // @ts-ignore
    updateDashboardsConfig({
      ...dashboardsConfig,
      newDashboardName: (event.target as HTMLInputElement).value,
    })
  }
  const handleCreateNewTargetChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    // @ts-ignore
    updateCreateNewTarget(event.target.checked)
    setLastDashboardtId('')
    setLastDashboardtType('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateLoading(true)
    // Figure out target dashboard id
    let targetId: string
    if (createNewTarget) {
      try {
        // const baseDashboard: IDashboard = await sdk.ok(sdk.dashboard(dashboardsConfig.base, 'title'));
        // If there is already a dashboard with the given title in the folder the create would fail, so make a UUID title
        // for safety's sake, come up with a better method later
        const newDashboard: IDashboard = await sdk.ok(
          sdk.create_dashboard({
            title: dashboardsConfig.newDashboardName || uuidv4(),
            folder_id: dashboardsConfig.folder,
            preferred_viewer: 'dashboards-next',
          })
        )
        targetId = newDashboard.id
      } catch (e) {
        updateError(e)
        updateLoading(false)
        return
      }
    } else {
      targetId = dashboardsConfig.target
    }

    setTargetId(baseId)
    setLastDashboardtId(baseId)
    setLastDashboardtType('Merging dashboards')
    // Make API call
    extensionContext.extensionSDK
      .fetchProxy(apiUrl, {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: JSON.stringify({
          baseId: dashboardsConfig.base,
          customerId: dashboardsConfig.customer,
          targetId,
        }),
      })
      .then(() => {
        updateSuccess(true)
        updateError(undefined)
        updateLoading(false)
        setTargetId(targetId)
        setLastDashboardtId(targetId)
        setLastDashboardtType('New Target Dashboard')
      })
      .catch((err) => {
        updateSuccess(false)
        updateError('Error applying changes to dashboard!')
        updateLoading(false)
        console.error(err)
      })
  }

  useEffect(() => {
    updateLoading(true)
    sdk
      .ok(sdk.all_folders())
      .then((folders: IFolder[]) => {
        const newFolderOptions = folders.map((folder: IFolder) => {
          return { value: folder.id, label: folder.name }
        })
        updateFolderOptions(newFolderOptions)
      })
      .catch((err) => {
        updateLoading(false)
        updateError(err)
      })
    sdk
      .ok(sdk.all_dashboards('id,title,folder'))
      .then((dashboards: IDashboardBase[]) => {
        const newDashboardOptions = dashboards.map(
          (dashboard: IDashboardBase) => {
            return {
              value: dashboard.id,
              label: `${dashboard.folder?.name}/${dashboard.title}`,
            }
          }
        )
        updateBaseOptions(newDashboardOptions)
        updateCustomerOptions(newDashboardOptions)
        updateTargetOptions(newDashboardOptions)
        updateLoading(false)
      })
      .catch((err) => {
        updateLoading(false)
        updateError(err)
      })
  }, [])

  return (
    <>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignContent="stretch"
        alignItems="stretch"
      >
        <FlexItem
          flex="1 0 400px"
          height="100%"
          mt="large"
          mb="small"
          ml="xxlarge"
        >
          <Box mb="large">
            {error && <MessageBar intent="critical">{error}</MessageBar>}
            {loading && (
              <MessageBar intent="inform">Loading...{<Spinner />}</MessageBar>
            )}
            {success && <MessageBar intent="positive">Success!</MessageBar>}
          </Box>
          <Form onSubmit={handleSubmit} height="100%">
            <Box mb="large">
              <Heading as="h2">Configure</Heading>
            </Box>
            <Box mt="large" mb="large">
              <Flex flexDirection="row" justifyContent="space-between">
                <FlexItem flex="1 1 400px">
                  <FieldSelect
                    label="Base Dashboard"
                    onChange={handleBaseChange}
                    name={'base'}
                    options={baseOptions}
                  />
                </FlexItem>
                <div style={{ visibility: baseId ? 'visible' : 'hidden' }}>
                  <IconButton
                    icon="Refresh"
                    label="Refresh Base Dashboard"
                    size="xxsmall"
                    onClick={handleBaseRefresh}
                  />
                </div>
              </Flex>
            </Box>
            <Box mt="large" mb="large">
              <Flex flexDirection="row" justifyContent="space-between">
                <FlexItem flex="1 1 400px">
                  <FieldSelect
                    label="Customer Dashboard"
                    onChange={handleCustomerChange}
                    name={'customer'}
                    options={customerOptions}
                  />
                </FlexItem>
                <div style={{ visibility: customerId ? 'visible' : 'hidden' }}>
                  <IconButton
                    icon="Refresh"
                    label="Refresh Customer Dashboard"
                    size="xxsmall"
                    onClick={handleCustomerRefresh}
                  />
                </div>
              </Flex>
            </Box>
            <Box mt="large" mb="large">
              <SpaceVertical>
                <FieldToggleSwitch
                  pl="small"
                  label="Create New Target Dashboard"
                  onChange={handleCreateNewTargetChange}
                  on={createNewTarget}
                  id="switch"
                />
                {!createNewTarget && (
                  <Flex flexDirection="row" justifyContent="space-between">
                    <FlexItem flex="1 1 400px">
                      <FieldSelect
                        label="Target Dashboard"
                        onChange={handleTargetChange}
                        name={'target-dashboard'}
                        options={targetOptions}
                      />
                    </FlexItem>
                    <div
                      style={{ visibility: targetId ? 'visible' : 'hidden' }}
                    >
                      <IconButton
                        icon="Refresh"
                        label="Refresh Target Dashboard"
                        size="xxsmall"
                        onClick={handleTargetRefresh}
                      />
                    </div>
                  </Flex>
                )}
                {createNewTarget && (
                  <Flex flexDirection="column" justifyContent="space-between">
                    <Flex flexDirection="row" justifyContent="space-between">
                      <FlexItem flex="1 0 400px">
                        <FieldSelect
                          label="Target Folder"
                          onChange={handleFolderChange}
                          name={'target-folder'}
                          options={folderOptions}
                        />
                      </FlexItem>
                    </Flex>
                    <Flex>
                      <FlexItem flex="1 0 400px">
                        <FieldText
                          label="Target Dashboard"
                          onChange={handleNewDashboardNameChange}
                          placeholder="Enter New Dashboard Name..."
                          name={'new-dashboard-name'}
                        />
                      </FlexItem>
                    </Flex>
                  </Flex>
                )}
              </SpaceVertical>
            </Box>
            <Box>
              <Button disabled={loading || validationMessages}>
                Update Dashboard
              </Button>
            </Box>
          </Form>
        </FlexItem>

        <FlexItem width="100%" flex="1 0 1000px">
          <Box p="xxlarge">
            {baseId && (
              <Box mb="large">
                <Heading textAlign="center" fontWeight="bold" as="h2">
                  {lastDashboardtype}
                </Heading>
              </Box>
            )}
            <EmbedDashboard id={lastDashboardId} />
          </Box>
        </FlexItem>
      </Flex>
    </>
  )
}
