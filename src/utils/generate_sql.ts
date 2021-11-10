import {writeMigration} from "./csv_to_sql" 
export async function GenerateSQL(input:string,updateSQL:Function, sdk, connection_name) {
    
    let sql = await writeMigration(input, 'test_table_name', sdk, connection_name)
    console.log(sql)
    
    updateSQL(sql)
  }