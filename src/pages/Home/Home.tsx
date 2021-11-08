import React, {  } from 'react'
import { HomeProps } from './types'
import { ContentContainer } from '../../styles';
// import { EmbedDashboard } from '../../components/EmbedDashboard';

export const Home: React.FC<HomeProps> = ({ }) => {
  let inputfile;
  function Upload() {
          var fileUpload = document.getElementById("fileUpload");
          var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
          if (regex.test(fileUpload.value.toLowerCase())) {
              if (typeof (FileReader) != "undefined") {
                  var reader = new FileReader();
                  reader.onload = function (e) {
                      var table = document.createElement("table");
                      var rows = e.target.result.split("\n");
                      for (var i = 0; i < rows.length; i++) {
                          var cells = rows[i].split(",");
                          if (cells.length > 1) {
                              var row = table.insertRow(-1);
                              for (var j = 0; j < cells.length; j++) {
                                  var cell = row.insertCell(-1);
                                  cell.innerHTML = cells[j];
                              }
                          }
                      }
                      inputfile = e.target.result;
                      var dvCSV = document.getElementById("dvCSV");
                      dvCSV.innerHTML = "";
                      dvCSV.appendChild(table);
                  }
                  reader.readAsText(fileUpload.files[0]);
              } else {
                alert("This browser does not support HTML5.");
      }
    } else {
      alert("Please upload a valid CSV file.");
    }
    }

  function GenerateSQL() {
    console.log(inputfile)
  }
  return (
        <ContentContainer flexDirection='row' justifyContent='space-between'>

            <img src="https://storage.googleapis.com/bytecode-hackathon-2021/SheetRunner_final.png" height="150px"/>


            <input type="file" id="fileUpload" />
            <input type="button" id="upload" value="Upload" onClick={(e) => Upload()} />
            <input type="button" id="upload" value="Generate SQL" onClick={(e) => GenerateSQL()} />
            <hr />
            <div id="dvCSV">
            </div>

        </ContentContainer>
  )
};
