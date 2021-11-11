import { update_dashboard_layout } from "@looker/sdk/lib/3.1/funcs"
import {writeMigration} from "./csv_to_sql" 
export async function GenerateSQL(input:string,updateDDL: Function, updateSQL:Function, sdk, connection_name, table_name) {
    
    let {createDDL, insertSQL} = await writeMigration(input, table_name, sdk, connection_name)
    updateDDL(createDDL)
    updateSQL(insertSQL)
  }