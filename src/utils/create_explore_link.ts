// https://looker.bytecode.io/explore/sql__nvf4tf8jd4jjj5/sql_runner_query?fields=sql_runner_query.detail*

import { ExtensionSDK } from "@looker/extension-sdk"
import { ISqlQueryCreate, Looker40SDK, LookerExtensionSDK } from "@looker/sdk"

export const createExploreLink: Function = async (tableName: string, updateMessage: Function, connection_name: string, sdk: Looker40SDK, extensionSDK: ExtensionSDK ) => {
    console.log('in createExploreLink')
    try{
        let queryObject: ISqlQueryCreate = {
          connection_name,
          sql: `Select * from looker_scratch.${tableName}`
        } 
        let queryCreationResponse = await sdk.ok(sdk.create_sql_query(queryObject))
        let slug: string = queryCreationResponse.slug
        
        updateMessage("Priming the Explore Experience")
        // Run it to 'prime' the explore
        await sdk.ok(sdk.run_sql_query(
            queryCreationResponse.slug,
            "txt"
          ))

        let exploreLink: string = `/explore/sql__${slug}/sql_runner_query?fields=sql_runner_query.detail*&toggle=vis`
        extensionSDK.openBrowserWindow(exploreLink,'_blank');
        updateMessage("Check out the data in the next browser tab ^")
    } catch (error) {
        updateMessage(`There was an error creating the sql explore link: ${error}`)
      }
    
}