class RolifyCreateRoles < ActiveRecord::Migration[7.0]
  def change
    create_table(:roles) do |t|
      t.string :name
      t.references :resource, :polymorphic => true

      t.timestamps
    end

    create_table(:users_roles, :id => false) do |t|
      t.references :user
      t.references :role
    end


    add_foreign_key :users_roles, :users
    add_foreign_key :users_roles, :roles

    add_index(:roles, :name)
    add_index(:roles, [ :name, :resource_type, :resource_id ])
    add_index(:users_roles, [ :user_id, :role_id ])

    reversible do |dir|
      dir.up do
        Role.create_translation_table! full_name: :string
        change_column :role_translations, :role_id, :bigint, index: true, foreign_key: {to_table: :roles}
        add_foreign_key :role_translations, :roles
      end

      dir.down do
        remove_foreign_key :role_translations, :roles
        Role.drop_translation_table!
      end
    end
  end
end
