class CreateDeviceManufacturers < ActiveRecord::Migration[7.0]
  def change
    create_table :device_manufacturers do |t|
      t.string :name, null: false
      t.timestamps null: false
    end
  end
end
