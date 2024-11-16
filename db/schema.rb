# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_11_16_194620) do
  create_table "app_versions", force: :cascade do |t|
    t.string "name", null: false
    t.integer "app_id", null: false
    t.integer "operating_system_id", null: false
    t.datetime "expires_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["app_id"], name: "index_app_versions_on_app_id"
    t.index ["operating_system_id"], name: "index_app_versions_on_operating_system_id"
  end

  create_table "apps", force: :cascade do |t|
    t.string "code", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "browser_versions", force: :cascade do |t|
    t.integer "browser_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["browser_id"], name: "index_browser_versions_on_browser_id"
  end

  create_table "browsers", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "device_manufacturers", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "device_models", force: :cascade do |t|
    t.integer "device_manufacturer_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["device_manufacturer_id"], name: "index_device_models_on_device_manufacturer_id"
  end

  create_table "devices", force: :cascade do |t|
    t.integer "user_id"
    t.string "uuid", limit: 2056, null: false
    t.string "device_token"
    t.string "fcm_token"
    t.integer "operating_system_version_id", null: false
    t.integer "device_model_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["device_model_id"], name: "index_devices_on_device_model_id"
    t.index ["operating_system_version_id"], name: "index_devices_on_operating_system_version_id"
    t.index ["user_id"], name: "index_devices_on_user_id"
  end

  create_table "network_types", force: :cascade do |t|
    t.string "code", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "operating_system_versions", force: :cascade do |t|
    t.integer "operating_system_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["operating_system_id"], name: "op_sys_ver_on_mob_op_sys_id"
  end

  create_table "operating_systems", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.integer "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_products_on_category_id"
  end

  create_table "role_translations", force: :cascade do |t|
    t.integer "role_id", null: false
    t.string "locale", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "full_name"
    t.index ["locale"], name: "index_role_translations_on_locale"
    t.index ["role_id"], name: "index_role_translations_on_role_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.integer "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["name"], name: "index_roles_on_name"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "code", null: false
    t.integer "user_id"
    t.integer "app_version_id", null: false
    t.integer "device_id", null: false
    t.integer "operating_system_version_id", null: false
    t.integer "browser_version_id"
    t.string "denied_reason"
    t.string "locale", null: false
    t.integer "network_type_id", null: false
    t.string "ip", null: false
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["app_version_id"], name: "index_sessions_on_app_version_id"
    t.index ["browser_version_id"], name: "index_sessions_on_browser_version_id"
    t.index ["code"], name: "index_sessions_on_code", unique: true
    t.index ["created_at"], name: "index_sessions_on_created_at"
    t.index ["device_id"], name: "index_sessions_on_device_id"
    t.index ["ip"], name: "index_sessions_on_ip"
    t.index ["network_type_id"], name: "index_sessions_on_network_type_id"
    t.index ["operating_system_version_id"], name: "index_sessions_on_operating_system_version_id"
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", limit: 80, null: false
    t.string "surname", limit: 80
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "api_key", null: false
    t.string "locale", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["api_key"], name: "index_users_on_api_key", unique: true
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

  add_foreign_key "app_versions", "apps"
  add_foreign_key "app_versions", "operating_systems"
  add_foreign_key "browser_versions", "browsers"
  add_foreign_key "device_models", "device_manufacturers"
  add_foreign_key "devices", "device_models"
  add_foreign_key "devices", "operating_system_versions"
  add_foreign_key "devices", "users"
  add_foreign_key "operating_system_versions", "operating_systems"
  add_foreign_key "operating_system_versions", "operating_systems"
  add_foreign_key "products", "categories"
  add_foreign_key "role_translations", "roles"
  add_foreign_key "sessions", "app_versions"
  add_foreign_key "sessions", "browser_versions"
  add_foreign_key "sessions", "devices"
  add_foreign_key "sessions", "network_types"
  add_foreign_key "sessions", "operating_system_versions"
  add_foreign_key "sessions", "users"
  add_foreign_key "users_roles", "roles"
  add_foreign_key "users_roles", "users"
end
