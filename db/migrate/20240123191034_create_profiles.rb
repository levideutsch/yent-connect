class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.integer :age
      t.string :sex
      t.string :location
      t.integer :user_id

      t.timestamps
    end
  end
end
