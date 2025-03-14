class AddWorkoutIdToWorkoutRecord < ActiveRecord::Migration[7.2]
  def change
    add_reference :workout_records, :workout, foreign_key: true 
  end
end
