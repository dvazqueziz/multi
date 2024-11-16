class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions do |t|
      t.string :code, null: false
      t.belongs_to :user, null: true
      t.belongs_to :app_version, null: false
      t.belongs_to :device, null: false
      t.belongs_to :operating_system_version, null: false
      t.belongs_to :browser_version, null: true
      t.string :denied_reason, null: true
      t.string :locale, null: false
      t.belongs_to :network_type, null: false
      t.string :ip, null: false
      t.float :latitude, null: true
      t.float :longitude, null: true

      t.timestamps null: false

    end

    add_index :sessions, :code, unique: true
    add_index :sessions, :ip, unique: false
    add_index :sessions, :created_at, unique: false

    add_foreign_key :sessions, :users
    add_foreign_key :sessions, :devices
    add_foreign_key :sessions, :app_versions
    add_foreign_key :sessions, :operating_system_versions
    add_foreign_key :sessions, :network_types
    add_foreign_key :sessions, :browser_versions
  end
end
