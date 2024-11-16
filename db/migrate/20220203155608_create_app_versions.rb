class CreateAppVersions < ActiveRecord::Migration[7.0]
  def change
    create_table :app_versions do |t|
      t.string :name, null: false
      t.belongs_to :app, null: false, foreign_key: true
      t.belongs_to :operating_system, null: false, foreign_key: true
      t.timestamp :expires_at, null: true
      t.timestamps null: false
    end
  end
end
