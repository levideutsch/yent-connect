class CreateUserSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :user_settings do |t|
      t.boolean :is_dark_mode, default: false
      t.integer :user_id

      t.timestamps
    end
  end
end
