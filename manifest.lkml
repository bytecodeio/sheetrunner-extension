application: auth0_test {
  label: "Auth0 Test"
  file: "./bundle.js"
  entitlements: {
    local_storage: yes
    navigation: yes
    new_window: yes
    use_embeds: yes
    core_api_methods: ["all_folders", "all_dashboards"]
    scoped_user_attributes: ["user_value"]
    global_user_attributes: ["locale"]
    use_form_submit: yes
  }
}
