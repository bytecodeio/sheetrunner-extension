import React, { useState } from 'react'
import { HomeProps } from './types'
import { ContentContainer } from '../../styles';
import { Upload } from '../../utils/upload';
import { GenerateSQL } from '../../utils/generate_sql';

// import { EmbedDashboard } from '../../components/EmbedDashboard';

export const Home: React.FC<HomeProps> = ({ }) => {
  let [inputfile, updatefile] = useState(null)


  return (
        <ContentContainer flexDirection='row' justifyContent='space-between'>

            <img src="https://storage.googleapis.com/bytecode-hackathon-2021/SheetRunner_final.png" height="150px"/>

            <input type="file" id="fileUpload" />
            <input type="button" id="upload" value="Upload" onClick={(e) => Upload(updatefile)} />
            <input type="button" id="upload" value="Generate SQL" onClick={(e) => GenerateSQL(inputfile)} />
            <hr />
            <div id="dvCSV">
            </div>

        </ContentContainer>
  )
};
