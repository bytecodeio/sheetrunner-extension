# Auth0 Test Extension


It uses [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/), the [React Extension SDK](https://github.com/looker-open-source/extension-sdk-react) for interacting with Looker, and [Webpack](https://webpack.js.org/) for building.

## Getting Started for Development

1. Clone or download a copy of this template to your development machine

2. Navigate (`cd`) to the template directory on your system

3. Install the dependencies with [Yarn](https://yarnpkg.com/).

   ```
   yarn install
   ```

   > You may need to update your Node version or use a [Node version manager](https://github.com/nvm-sh/nvm) to change your Node version.

4) Start the development server

   ```
   yarn start
   ```

   Great! Your extension is now running and serving the JavaScript at http://localhost:8080/bundle.js.

   > **Note well:** The webpack development server also supports https. To use, add the parameter --https to the start command
   > `"start": "webpack-dev-server --hot --disable-host-check --https"`
   > Should you decide to use https, you should visit the bundle URL you are running as there will likely be a certificate warning. The development server runs with a self-signed SSL certificate, so you will need to accept this to allow your browser to connect to it.

   The default yarn start command runs with hot module replacement working. Some changes will cause a full reload of the extension iframe. When this happens the extension framework connection will break. You will need to do a full page reload of the outer page to restart
   the extension.

   To run without hot module replacement run `yarn start-no-hot`

5) Now log in to Looker and create a new project.

   This is found under **Develop** => **Manage LookML Projects** => **New LookML Project**.

   You'll want to select "Blank Project" as your "Starting Point". You'll now have a new project with no files.

   1. In your copy of the extension project you have `manifest.lkml` file.

   You can either drag & upload this file into your Looker project, or create a `manifest.lkml` with the same content. Change the `id`, `label`, or `url` as needed.

   ```
   application: auth0_test {
    label: "Autho Test"
    # file: "./bundle.js"
    url: "http://localhost:8080/bundle.js"
    entitlements: {
      local_storage: yes
      navigation: yes
      new_window: yes
      new_window_external_urls: []
      core_api_methods: ["all_folders", "all_dashboards", "create_dashboard"]
      external_api_urls: ["https://lambda_uri"]
      scoped_user_attributes: ["user_value"]
      global_user_attributes: ["locale"]
      use_form_submit: yes
      allow_same_origin: yes
      use_embeds:  yes
    }
   }
   ```

## Deployment

The process above requires your local development server to be running to load the extension code. To allow other people to use the extension, we can build the JavaScript file and include it in the project directly.

1. In your extension project directory on your development machine you can build the extension with `yarn build`.
2. Drag and drop the generated `dist/bundle.js` file into the Looker project interface
3. Modify your `manifest.lkml` to use `file` instead of `url`:
   ```
   application: auth0_test {
     label: "Autho Test"
     file: "bundle.js"
      entitlements: {
      local_storage: yes
      navigation: yes
      new_window: yes
      new_window_external_urls: []
      core_api_methods: ["all_folders", "all_dashboards", "create_dashboard"]
      external_api_urls: ["https://lambda_uri"]
      scoped_user_attributes: ["user_value"]
      global_user_attributes: ["locale"]
      use_form_submit: yes
      allow_same_origin: yes
      use_embeds:  yes
    }
   }
   ```

## Notes

- Webpack's module splitting is not currently supported.
- The template uses Looker's component library and styled components. Neither of these libraries are required so you may remove and replace them with a component library of your own choice,

## Related Projects

- [Looker React extension template](https://github.com/looker-open-source/extension-template-react)
- [Looker React/Redux extension template ](https://github.com/looker-open-source/extension-template-redux)
- [Looker extension SDK](https://www.npmjs.com/package/@looker/extension-sdk)
- [Looker extension SDK for React](https://www.npmjs.com/package/@looker/extension-sdk-react)
- [Looker SDK](https://www.npmjs.com/package/@looker/sdk)
- [Looker Embed SDK](https://github.com/looker-open-source/embed-sdk)
- [Looker Components](https://components.looker.com/)
- [Styled components](https://www.styled-components.com/docs)
