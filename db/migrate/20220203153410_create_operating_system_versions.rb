class CreateOperatingSystemVersions < ActiveRecord::Migration[7.0]
  def change
    create_table :operating_system_versions do |t|
      t.belongs_to :operating_system, null: false, foreign_key: true, index: { name: 'op_sys_ver_on_mob_op_sys_id' }
      t.string :name, null: false
      t.timestamps null: false
    end

    add_foreign_key :operating_system_versions, :operating_systems

  end
end
