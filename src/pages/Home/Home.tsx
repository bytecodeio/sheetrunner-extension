import React, { useState } from 'react'
import { HomeProps } from './types'
import { ContentContainer } from '../../styles';
import { Upload } from '../../utils/upload';
import { GenerateSQL } from '../../utils/generate_sql';
import { ExecuteSQL } from '../../utils/execute_sql';
import Dropdown from '../../../node_modules/react-bootstrap/Dropdown';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/stylesheet.css';




export const Home: React.FC<HomeProps> = async ({sdk}) => {

  let [inputfile, updatefile] = useState("")
  let [sql, updateSQL] = useState("")
  let [result, updateResult] = useState("")
  let [connection_name, setConnectionName] = useState("bytecode_looker_bigquery")

  const connection_response = await sdk.ok(sdk.all_connections())

  console.log(connection_response)


  return (
        <ContentContainer flexDirection='row' justifyContent='space-between'>



        <div class="wrapper">

        <nav id="sidebar">
        <div class="sidebar-header">
            <h3>Connection</h3>

            <div class="model-selection">
            <label for="model">Choose a model:</label>

            <Dropdown id="uniquename">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu id="uniquename2">
                {connection_response.map((connection) => {
                  return <Dropdown.Item
                        href="#/action-1">
                        {connection}
                      </Dropdown.Item>})
                }
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            </div>
        </div>

       </nav>



    <div id="content">

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">

                <button type="button" id="sidebarCollapse" class="btn btn-info">
                    <i class="fas fa-align-left"></i>
                    <span>Toggle Sidebar</span>
                </button>
            </div>
        </nav>
    </div>
</div>





            <img src="https://storage.googleapis.com/bytecode-hackathon-2021/SheetRunner_final.png" height="150px"/>

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
        </ContentContainer>
  )
};
