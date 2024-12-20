class AddWeightToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :weight, :integer, default: 50, null: false
  end
end
