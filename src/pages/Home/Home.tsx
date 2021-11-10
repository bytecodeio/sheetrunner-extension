import React, { useState } from 'react'
import { HomeProps } from './types'
import { ContentContainer } from '../../styles';
import { Upload } from '../../utils/upload';
import { GenerateSQL } from '../../utils/generate_sql';
import { ExecuteSQL } from '../../utils/execute_sql';

// import { EmbedDashboard } from '../../components/EmbedDashboard';

export const Home: React.FC<HomeProps> = ({sdk}) => {
  
  let [inputfile, updatefile] = useState("")
  let [sql, updateSQL] = useState("")
  let [result, updateResult] = useState("")
  let [connection_name, setConnectionName] = useState("")
  setConnectionName("bytecode_looker_bigquery");

  const connection_response = sdk.ok(sdk.all_connections())

  return (
        <ContentContainer flexDirection='row' justifyContent='space-between'>

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
