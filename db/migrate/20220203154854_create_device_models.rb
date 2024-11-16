class CreateDeviceModels < ActiveRecord::Migration[7.0]
  def change
    create_table :device_models do |t|
      t.belongs_to :device_manufacturer, null: false, foreign_key: true
      t.string :name, null: false
      t.timestamps null: false
    end
  end
end
