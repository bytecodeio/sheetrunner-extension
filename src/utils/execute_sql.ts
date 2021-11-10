import { ISqlQueryCreate, Looker40SDK } from '@looker/sdk'

export async function ExecuteSQL(sql: string,updateResults: Function, sdk:Looker40SDK, connection_name) {

  let queries = sql.split(";")

  queries.forEach(async (statement) => {
    let queryObject: ISqlQueryCreate = {
      connection_name,
      sql: statement
    } 

    let queryCreationResponse = await sdk.ok(sdk.create_sql_query(queryObject))
    console.log(queryCreationResponse)

    let response = await sdk.ok(sdk.run_sql_query(
      queryCreationResponse.slug,
     "json"
    ))
    console.log(JSON.stringify(response))
    updateResults(response)
  })


  }