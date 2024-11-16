class CreateBrowserVersions < ActiveRecord::Migration[7.0]
  def change
    create_table :browser_versions do |t|
      t.belongs_to :browser, null: false, foreign_key: true
      t.string :name, null: false

      t.timestamps null: false
    end
  end
end
