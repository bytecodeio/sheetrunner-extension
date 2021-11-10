import {writeMigration} from "./csv_to_sql" 
export async function GenerateSQL(input:string,updateSQL:Function) {
    
    let sql = await writeMigration(input, 'test_table_name')
    console.log(sql)
    
    updateSQL(sql)
  }