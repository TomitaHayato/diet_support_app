class CreateWorkouts < ActiveRecord::Migration[7.2]
  def change
    create_table :work_outs do |t|
      t.string :name   , null: false
      t.float  :mets   , null: false
      t.timestamps
    end
  end
end
