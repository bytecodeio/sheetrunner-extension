import { Looker40SDK, IDBConnection } from '@looker/sdk'
const csv = require('csvtojson');

function getSQLColumnName(csvColumnName) {
    return csvColumnName
        .replace(/ /g, '')
        .replace('\\', '')
        .replace('/', '')
        .replace('\r', '')
        .replace('-', '');
}

function getSafeStringValue (str: string):string {
    if (str === undefined || str.length === 0) return ""
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "";
            case "\r":
                return "";
            case "'":
                return "'"+char;
            case "\"":
            case "\\":
            case "%":
                return "\\"+char;
        }
    });
}

async function createTable(sql:string, tableName:string, headers: string[], scratch_schema: string) {

    const start = `CREATE OR REPLACE TABLE ${scratch_schema}.${tableName} ( `;
    sql += start
    headers.map((header, index) => {
        const name: string = getSQLColumnName(header);
        const type: string = 'string';
        const line: string = `${name} ${type}${index !== headers.length - 1 ? ',' : ''} `;
        sql +=line;
    });
    sql +=  ');';
    return sql
}

function insert(tableName: string, sql: string, rows: string[], columns:string[], schema_name: string) {
    const start = `INSERT INTO ${schema_name}.${tableName} ( ${columns.map(getSQLColumnName).join(', ')} )  VALUES `;
    sql += start;
    rows = rows.filter(
        (x)=> {
           return x.length > columns.length +1
        })
    console.log(57)
    rows.map((row, i) => {
        const valuesArray: string[] = row.split(",")
   
        const newValues = columns.map((c,i) => {
            const value = valuesArray[i];
            const toPrint =`'${getSafeStringValue(value)}'`;
            return toPrint;

        });
        // Avoid empty line inserts
       
            const values = `(${newValues.join(', ')})${i !== rows.length - 1 ? ',' : ''} `;
            sql +=values;
        
    });

    sql += `;`;
    // sql.replace(',,',',').replace(',;',';').replace(', ;',';');
   return sql
}

async function insertions(sql, tableName, rowsArray, columns, scratch_schema) {
    while (rowsArray.length) {
        const thousand: string[] = rowsArray.splice(0, 1000);
        sql = insert(tableName, sql, thousand, columns, scratch_schema);
    }
    return sql
}

export async function writeMigration(inputData: string, tableName: string, sdk: Looker40SDK, connection_name) {
   
    let scratch_schema_response = await sdk.ok(sdk.connection(connection_name))
    console.log(scratch_schema_response)
    let scratch_schema = scratch_schema_response.tmp_db_name || 'looker_scratch'

    const data: string = inputData

    const rowsArray: string[] = data.split("\n")
    const columns: string[] = rowsArray[0].split(",");
    rowsArray.shift()
    let createDDL: string = ''
    let insertSQL: string = ''
    createDDL = await createTable(createDDL, tableName, columns, scratch_schema);
    insertSQL = await insertions(insertSQL, tableName, rowsArray, columns, scratch_schema);
    
    return {createDDL,insertSQL}
};
