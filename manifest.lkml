# project_name: "join_2021_spreadsheet"

application: sheetrunner {
  label: "SheetRunner"
  # url: "https://localhost:8080/bundle.js"
  file: "bundle.js"
  entitlements: {
    local_storage: yes
    navigation: yes
    new_window: yes
    new_window_external_urls: []
    core_api_methods: ["all_folders", "all_dashboards", "create_dashboard", "create_sql_query","run_sql_query",  "all_connections", "connection"]
    external_api_urls: ["https://lambda_uri"]
    scoped_user_attributes: ["user_value"]
    global_user_attributes: ["locale"]
    use_form_submit: yes
    # allow_same_origin: yes
    use_embeds:  yes
  }
}

application: sheetrunner_local_dev {
  label: "SheetRunner (dev)"
  url: "https://localhost:8080/bundle.js"
  # file: "bundle.js"
  entitlements: {
    local_storage: yes
    navigation: yes
    new_window: yes
    new_window_external_urls: []
    core_api_methods: ["all_folders", "all_dashboards", "create_dashboard", "create_sql_query","run_sql_query",  "all_connections", "connection"]
    external_api_urls: ["https://lambda_uri"]
    scoped_user_attributes: ["user_value"]
    global_user_attributes: ["locale"]
    use_form_submit: yes
    # allow_same_origin: yes
    use_embeds:  yes
  }
}
