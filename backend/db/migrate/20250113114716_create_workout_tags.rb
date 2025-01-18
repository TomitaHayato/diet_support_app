class CreateWorkoutTags < ActiveRecord::Migration[7.2]
  def change
    create_table :workout_tags do |t|
      t.references :work_out, foreign_key: true
      t.references :tag     , foreign_key: true

      t.timestamps
    end
    add_index :workout_tags, [:work_out_id, :tag_id], unique: true
  end
end
