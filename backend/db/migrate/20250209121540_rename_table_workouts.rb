class RenameTableWorkouts < ActiveRecord::Migration[7.2]
  def change
    rename_table :work_outs, :workouts
    rename_column :workout_tags, :work_out_id, :workout_id
  end
end
