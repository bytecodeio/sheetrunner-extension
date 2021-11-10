
const csv = require('csvtojson');

function getSQLColumnName(csvColumnName) {
    return csvColumnName
        .replace(/ /g, '')
        .replace('\\', '')
        .replace('/', '')
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
                return "\\n";
            case "\r":
                return "\\r";
            case "'":
                return "'"+char;
            case "\"":
            case "\\":
            case "%":
                return "\\"+char;
        }
    });
}

async function createTable(sql:string, tableName:string, headers: string[]) {

    const start = `CREATE TABLE ${tableName} (\n`;
    sql += start
    headers.map((header, index) => {
        const name: string = getSQLColumnName(header);
        const type: string = 'varchar';
        const line: string = `${name} ${type}${index !== headers.length - 1 ? ',' : ''}\n`;
        sql +=line;
    });
    sql +=  ');\n';
    return sql
}

function insert(tableName: string, sql: string, rows, columns) {
    const start = `INSERT INTO ${tableName} ( ${columns.map(getSQLColumnName).join(', ')} )\n VALUES\n`;
    sql += start;
    rows.map((row, i) => {
        const valuesArray: string[] = row.split(",")
   
        const newValues = columns.map((c,i) => {
            const value = valuesArray[i];
            const toPrint =`'${getSafeStringValue(value)}'`;
            return toPrint;

        });
        const values = `(${newValues.join(', ')})${i !== rows.length - 1 ? ',' : ''}\n`;
        sql +=values;
    });

    sql += `;`;
   return sql
}

async function insertions(sql, tableName, rowsArray, columns) {
    while (rowsArray.length) {
        const thousand = rowsArray.splice(0, 1000);
        sql = insert(tableName, sql, thousand, columns);
    }
    return sql
}

export async function writeMigration(inputData: string, tableName: string) {
   
    const data: string = inputData

    const rowsArray: string[] = data.split("\n")
    
    const columns: string[] = rowsArray[0].split(",");
    let sql: string = "";
    sql = await createTable(sql, tableName, columns);
    sql = await insertions(sql, tableName, rowsArray, columns);
    console.log(sql)
    return sql
};
