application: pushchangestodashboard {
  label: "Push Changes To Customer Dashboard"
  file: "./pushchangestodashboard.js"
  entitlements: {
    local_storage: yes
    navigation: yes
    new_window: yes
    use_embeds: yes
    core_api_methods: ["all_folders", "all_dashboards"]
    external_api_urls: ["https://cwo39i9qx5.execute-api.us-west-2.amazonaws.com/default/Harvest-Group-Dashboard-Merge"]
    scoped_user_attributes: ["user_value"]
    global_user_attributes: ["locale"]
    use_form_submit: yes
  }
}
