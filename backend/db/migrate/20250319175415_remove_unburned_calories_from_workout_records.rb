class RemoveUnburnedCaloriesFromWorkoutRecords < ActiveRecord::Migration[7.2]
  def change
    remove_column :workout_records, :unburned_calories, :integer
  end
end
