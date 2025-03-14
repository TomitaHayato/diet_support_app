class RemoveColumnsFromUser < ActiveRecord::Migration[7.2]
  def change
    remove_column :users, :nickname, :string
    remove_column :users, :image   , :string
  end
end
