import React, { useState, useEffect } from 'react'
import { HomeProps } from './types'
import { ContentContainer } from '../../styles';
import { Upload } from '../../utils/upload';
import { GenerateSQL } from '../../utils/generate_sql';
import { ExecuteSQL } from '../../utils/execute_sql';
import { Select, Space, SpaceVertical, Button, Status, Grid } from '@looker/components'
import { IDBConnection, Looker40SDK } from '@looker/sdk';
import { createExploreLink } from '../../utils/create_explore_link';

export const Home: React.FC<HomeProps> = ({ sdk, extensionSDK }) => {

  let [inputfile, updatefile] = useState()
  let [sql, updateSQL] = useState()
  let [connection_name, setConnectionName] = useState("bytecode_looker_bigquery")
  let [all_connections, setAllConnections] = useState<IDBConnection[]>([])
  let [showNav, setShowNav] = useState<boolean>(true)
  let [tableName, setTableName] = useState<String>('new_sheetrunner_table')
  let [message, setMessage] = useState<String>()

  // This Effect will trigger once, at startup
  useEffect(() => {
    fetchConnections()
  }, [])

  // This Effect will trigger when the inputfile changes, after 'upload file'
  useEffect(() => {
    if (inputfile) {
      setMessage("Generating DDL & SQL...")
      GenerateSQL(inputfile, updateSQL, sdk, connection_name, tableName)
    }
  }, [inputfile])

  // This Effect will trigger when the parsed SQL is updated, after 'generate sql'
  useEffect(() => {
    if (sql) {
      setMessage("Building Table...")
      ExecuteSQL(sql, setMessage, sdk, connection_name)
    }
  }, [sql])

  // This Effect will trigger once
  useEffect(() => {
    if (message === 'Done with SQL execution. Pulling up an explore.') {
      setMessage('Almost there, preparing an explore.')
      createExploreLink(tableName, setMessage, connection_name, sdk, extensionSDK)
    }
  }, [message])

  // This async function will get the connections and set it as a variable
  const fetchConnections = async () => {
    const response = await sdk.ok(sdk.all_connections())
    setAllConnections(response)
  }

  // This tiny function toggles the nav
  const toggleNav = () => setShowNav(!showNav)

  return (
    <>

    <span>
    <img src="https://storage.googleapis.com/bytecode-hackathon-2021/SheetRunner_final.png" height="100px" />
    </span>


    <Space m="20px" p="10px">

    <Grid>
      {showNav ?
      <div className="wrapper">


        <SpaceVertical id="sidebar">



          <label htmlFor="model">Choose a connection:</label>

            <Select
              id='selectConnection'
              onChange={setConnectionName}
              options={all_connections ? all_connections.map(c => { return { value: c.name } }) : [{ value: 'loading...' }]}
            />

            <Button type="button" id="sidebarCollapse" className="btn btn-info" onClick={toggleNav}>Hide</Button>

          </SpaceVertical>
        </div>
        :

          <Button onClick={toggleNav}>Show</Button>

      }
    </Grid>



    <Grid>
      <div id="buttons" >



       <SpaceVertical id="uploadfunctions">

        <input type="file" id="fileUpload" />
        <Button type="button" id="upload" value="Upload" onClick={(e) => {Upload(updatefile); setMessage("Uploading File...")}}>Upload</Button>
        {/* <input type="button" id="parse" value="Generate SQL" onClick={(e) => GenerateSQL(inputfile, updateSQL, sdk, connection_name)} />
        <input type="button" id="upload" value="Execute SQL" onClick={(e) => ExecuteSQL(sql, updateResult, sdk, connection_name)} /> */}


        {message ? ( <>
          {/* style="max-width: 790px; display: block; margin: 0 auto" */}
            <img src="http://clipartbest.com/cliparts/yio/eKq/yioeKqXpT.gif"/>
            <Status>{message}</Status>
          </>
        )
          : null}


       </SpaceVertical>

      </div>
      {/* <hr />
      <div id="dvCSV">
      </div>
      <hr />
      <div id="sql">
        {sql}
      </div>
      <div id="results">
        {result}
      </div> */}
    </Grid>
   </Space>
   </>
  )
};
