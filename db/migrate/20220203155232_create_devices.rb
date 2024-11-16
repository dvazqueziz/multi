class CreateDevices < ActiveRecord::Migration[7.0]
  def change
    create_table :devices do |t|
      t.belongs_to :user, null: true, foreign_key: true
      t.string :uuid, null: false, limit: 2056
      t.string :device_token
      t.string :fcm_token
      t.belongs_to :operating_system_version, null: false, foreign_key: true
      t.belongs_to :device_model, null: false, foreign_key: true

      t.timestamps null: false
    end
  end
end
