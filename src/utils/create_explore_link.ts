// https://looker.bytecode.io/explore/sql__nvf4tf8jd4jjj5/sql_runner_query?fields=sql_runner_query.detail*

import { ISqlQueryCreate, Looker40SDK } from "@looker/sdk"

export const createExploreLink: Function = async (tableName: string, updateMessage: Function, connection_name: string, sdk: Looker40SDK ) => {
    try{
        let queryObject: ISqlQueryCreate = {
          connection_name,
          sql: `Select * from looker_scratch.${tableName}`
        } 
        let queryCreationResponse = await sdk.ok(sdk.create_sql_query(queryObject))
        let slug: string = queryCreationResponse.slug
        let exploreLink: string = ``
        updateMessage("Successfully created a table and inserted the data!")
    } catch (error) {
        updateMessage(`There was an error creating the sql explore link: ${error}`)
      }
    
}