import { ISqlQueryCreate, Looker40SDK } from '@looker/sdk'

export async function ExecuteSQL(ddl: string, sql: string, updateMessage: Function, sdk: Looker40SDK, connection_name) {

  let queries = sql.split(";").filter(x => x.length > 0)

  let promises: Promise<any>[] = [];
  
  try{ let queryObject: ISqlQueryCreate = {
    connection_name,
    sql: ddl
  }
  let queryCreationResponse = await sdk.ok(sdk.create_sql_query(queryObject))
  let response = await sdk.ok(sdk.run_sql_query(
    queryCreationResponse.slug,
    "txt"
  ))
  updateMessage("Created Table")
 } catch (error) {
      updateMessage(`There was an error creating the table: ${error}`)
    }


  promises = queries.map(async (statement) => { 
     try{ let queryObject: ISqlQueryCreate = {
        connection_name,
        sql: statement
      }
      let queryCreationResponse = await sdk.ok(sdk.create_sql_query(queryObject))
      let response = await sdk.ok(sdk.run_sql_query(
        queryCreationResponse.slug,
        "txt"
      ))
      console.log(response)
      updateMessage("Loading Data...")
     } catch (error) {
          updateMessage(`There was an error loading data: ${error}`)
        }
  })

  Promise.all(promises).then((result) => {
    updateMessage('Done with creation. Pulling up an explore.')
  })


}