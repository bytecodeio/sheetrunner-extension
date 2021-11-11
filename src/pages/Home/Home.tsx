import React, { useState, useEffect } from 'react'
import { HomeProps } from './types'
import { ContentContainer } from '../../styles';
import { Upload } from '../../utils/upload';
import { GenerateSQL } from '../../utils/generate_sql';
import { ExecuteSQL } from '../../utils/execute_sql';
import { Select, Space, SpaceVertical, Button } from '@looker/components'
import { IDBConnection } from '@looker/sdk';




export const Home: React.FC<HomeProps> = ({ sdk }) => {

  let [inputfile, updatefile] = useState("")
  let [sql, updateSQL] = useState("")
  let [result, updateResult] = useState("")
  let [connection_name, setConnectionName] = useState("bytecode_looker_bigquery")
  let [all_connections, setAllConnections] = useState<IDBConnection[]>([])
  let [showNav, setShowNav] = useState<boolean>(true)

  // This will trigger once, at startup
  useEffect(() => {
    fetchConnections()
  }, [])

  // This will get the connections and set it as a variable
  const fetchConnections = async () => {
    const response = await sdk.ok(sdk.all_connections())
    setAllConnections(response)
  }

  // This function toggles the nav
  const toggleNav = () => setShowNav(!showNav)

  console.log('response: ' + all_connections)


  return (
    <Space>
      {showNav ?
      <div className="wrapper">
        <SpaceVertical id="sidebar">
          <label htmlFor="model">Choose a connection:</label>
          <Select
            id='selectConnection'
            onChange={(e)=>console.log(e)}
            options={all_connections ? all_connections.map(c => { return { value: c.name } }) : [{ value: 'loading...' }]}
          />
          <Button type="button" id="sidebarCollapse" className="btn btn-info" onClick={toggleNav}>Hide</Button>
        </SpaceVertical>
      </div>
      : 
      <Button onClick={toggleNav}>Show</Button>
      }


      <img src="https://storage.googleapis.com/bytecode-hackathon-2021/SheetRunner_final.png" height="150px" />

      <div id="buttons" >

        <input type="file" id="fileUpload" />
        <input type="button" id="upload" value="Upload" onClick={(e) => Upload(updatefile)} />
        <input type="button" id="parse" value="Generate SQL" onClick={(e) => GenerateSQL(inputfile, updateSQL, sdk, connection_name)} />
        <input type="button" id="upload" value="Execute SQL" onClick={(e) => ExecuteSQL(sql, updateResult, sdk, connection_name)} />

      </div>
      <hr />
      <div id="dvCSV">
      </div>
      <hr />
      <div id="sql">
        {sql}
      </div>
      <div id="results">
        {result}
      </div>
    </Space>
  )
};
