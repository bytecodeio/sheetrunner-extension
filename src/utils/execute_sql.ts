import { ISqlQueryCreate, Looker40SDK } from '@looker/sdk'

export async function ExecuteSQL(sql: string, updateMessage: Function, sdk: Looker40SDK, connection_name) {

  let queries = sql.split(";").filter(x => x.length > 0)

  let promises: Promise<any>[] = [];

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
          updateMessage(`There was an error creating the table: ${error}`)
        }
  })

  Promise.all(promises).then((result) => {
    updateMessage('Done with SQL execution. Pulling up an explore.')
  })


}